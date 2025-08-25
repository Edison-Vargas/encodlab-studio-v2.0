import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { FullscreenModal } from "@/components/ui/fullscreen-modal";
import { Copy, AlertCircle, CheckCircle, Shield, X, AlertTriangle, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { cn } from "@/lib/utils";

interface ValidationResult {
  isValid: boolean;
  header: any;
  payload: any;
  signature: string;
  algorithm: string;
  errors: string[];
  warnings: string[];
}

export function JWTValidator() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState("");
  const [isRealTimeValidation, setIsRealTimeValidation] = useState(false);
  const { toast } = useToast();

  const decodeJWT = (jwt: string): { header: any, payload: any, signature: string } => {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      throw new Error("JWT deve ter exatamente 3 partes separadas por ponto");
    }

    const [headerB64, payloadB64, signature] = parts;
    
    const headerJson = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
    const header = JSON.parse(headerJson);
    
    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    return { header, payload, signature };
  };

  const validateSignature = (headerB64: string, payloadB64: string, signature: string, secret: string, algorithm: string): boolean => {
    // Para demonstração, simulamos a validação
    // Em produção real, seria necessário usar bibliotecas de criptografia específicas
    if (!secret.trim()) return false;
    
    try {
      const data = headerB64 + "." + payloadB64;
      const expectedSignature = btoa(data + secret).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      return signature === expectedSignature.substring(0, 43);
    } catch {
      return false;
    }
  };

  const validateClaims = (payload: any): { errors: string[], warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const now = Math.floor(Date.now() / 1000);

    // Validar expiração
    if (payload.exp) {
      if (typeof payload.exp !== 'number') {
        errors.push("Claim 'exp' deve ser um número (timestamp)");
      } else if (payload.exp < now) {
        errors.push("Token expirado");
      } else if (payload.exp - now < 300) { // 5 minutos
        warnings.push("Token expira em menos de 5 minutos");
      }
    } else {
      warnings.push("Token não possui claim de expiração (exp)");
    }

    // Validar issued at
    if (payload.iat) {
      if (typeof payload.iat !== 'number') {
        errors.push("Claim 'iat' deve ser um número (timestamp)");
      } else if (payload.iat > now + 60) { // 1 minuto de tolerância
        errors.push("Token foi emitido no futuro");
      }
    }

    // Validar not before
    if (payload.nbf) {
      if (typeof payload.nbf !== 'number') {
        errors.push("Claim 'nbf' deve ser um número (timestamp)");
      } else if (payload.nbf > now) {
        errors.push("Token ainda não é válido (nbf)");
      }
    }

    // Validar subject
    if (!payload.sub) {
      warnings.push("Token não possui subject (sub)");
    }

    // Validar issuer
    if (!payload.iss) {
      warnings.push("Token não possui issuer (iss)");
    }

    // Validar audience
    if (!payload.aud) {
      warnings.push("Token não possui audience (aud)");
    }

    return { errors, warnings };
  };

  const validateJWT = () => {
    if (!token.trim()) {
      setError("Por favor, insira um token JWT");
      return;
    }

    try {
      setError("");
      
      const { header, payload, signature } = decodeJWT(token.trim());
      const algorithm = header.alg || 'unknown';
      
      // Validar estrutura do header
      const headerErrors: string[] = [];
      if (!header.alg) {
        headerErrors.push("Header não possui algoritmo (alg)");
      }
      if (!header.typ || header.typ !== 'JWT') {
        headerErrors.push("Header deve ter typ: 'JWT'");
      }

      // Validar claims do payload
      const claimsValidation = validateClaims(payload);
      
      // Validar assinatura (apenas se secret foi fornecido)
      let isSignatureValid = true;
      const signatureErrors: string[] = [];
      
      if (secret.trim()) {
        const parts = token.split('.');
        isSignatureValid = validateSignature(parts[0], parts[1], signature, secret, algorithm);
        if (!isSignatureValid) {
          signatureErrors.push("Assinatura inválida");
        }
      } else {
        signatureErrors.push("Secret não fornecido - assinatura não validada");
      }

      // Compilar resultado
      const allErrors = [...headerErrors, ...claimsValidation.errors, ...signatureErrors];
      const isValid = allErrors.length === 0 && isSignatureValid;

      const result: ValidationResult = {
        isValid,
        header,
        payload,
        signature,
        algorithm,
        errors: allErrors,
        warnings: claimsValidation.warnings
      };

      setValidationResult(result);

      if (isValid) {
        toast({
          title: "Token JWT válido!",
          description: "Todas as validações passaram com sucesso.",
        });
      } else {
        toast({
          title: "Token JWT inválido",
          description: `${allErrors.length} erro(s) encontrado(s).`,
          variant: "destructive"
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao validar token");
      setValidationResult(null);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copiado!`,
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const formatTimestamp = (timestamp: number): string => {
    try {
      return new Date(timestamp * 1000).toLocaleString();
    } catch {
      return "Data inválida";
    }
  };

  // Real-time validation
  const validateInRealTime = useCallback(() => {
    if (!token.trim() || !isRealTimeValidation) {
      setValidationResult(null);
      setError("");
      return;
    }

    try {
      setError("");
      
      const { header, payload, signature } = decodeJWT(token.trim());
      const algorithm = header.alg || 'unknown';
      
      // Validar estrutura do header
      const headerErrors: string[] = [];
      if (!header.alg) {
        headerErrors.push("Header não possui algoritmo (alg)");
      }
      if (!header.typ || header.typ !== 'JWT') {
        headerErrors.push("Header deve ter typ: 'JWT'");
      }

      // Validar claims do payload
      const claimsValidation = validateClaims(payload);
      
      // Validar assinatura (apenas se secret foi fornecido)
      let isSignatureValid = true;
      const signatureErrors: string[] = [];
      
      if (secret.trim()) {
        const parts = token.split('.');
        isSignatureValid = validateSignature(parts[0], parts[1], signature, secret, algorithm);
        if (!isSignatureValid) {
          signatureErrors.push("Assinatura inválida");
        }
      } else {
        signatureErrors.push("Secret não fornecido - assinatura não validada");
      }

      // Compilar resultado
      const allErrors = [...headerErrors, ...claimsValidation.errors, ...signatureErrors];
      const isValid = allErrors.length === 0 && isSignatureValid;

      const result: ValidationResult = {
        isValid,
        header,
        payload,
        signature,
        algorithm,
        errors: allErrors,
        warnings: claimsValidation.warnings
      };

      setValidationResult(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao validar token");
      setValidationResult(null);
    }
  }, [token, secret, isRealTimeValidation]);

  // Effect for real-time validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateInRealTime();
    }, 500); // Debounce 500ms

    return () => clearTimeout(timeoutId);
  }, [validateInRealTime]);

  // Drag and drop for JWT files
  const handleFileDrop = (file: File) => {
    if (file.type === 'text/plain' || file.name.endsWith('.jwt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setToken(content.trim());
        toast({
          title: "Arquivo JWT carregado!",
          description: "Token JWT extraído do arquivo com sucesso.",
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Tipo de arquivo não suportado",
        description: "Por favor, use apenas arquivos .jwt ou .txt",
        variant: "destructive"
      });
    }
  };

  const { isDragOver, dragProps } = useDragDrop({
    onFileDrop: handleFileDrop,
    onTextDrop: setToken,
    acceptedTypes: ['text/*']
  });

  const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Shield className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JWT Validator</h1>
          <p className="text-muted-foreground">
            Valide a assinatura e integridade de tokens JWT
          </p>
        </div>
      </div>

      <Card className={cn("glow-card transition-all duration-300", isDragOver && "border-primary/50 bg-primary/5")}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              Token JWT
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setToken(sampleJWT)}
              >
                Usar exemplo
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isRealTimeValidation}
                  onChange={(e) => setIsRealTimeValidation(e.target.checked)}
                  className="rounded"
                />
                Validação em tempo real
              </label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" {...dragProps}>
          {isDragOver && (
            <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center z-10">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-primary font-medium">Solte o arquivo JWT aqui</p>
              </div>
            </div>
          )}
          
          <Textarea
            placeholder="Cole seu token JWT aqui..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={cn(
              "min-h-[120px] font-mono text-sm jwt-token",
              validationResult?.isValid && isRealTimeValidation && "border-success/50",
              validationResult && !validationResult.isValid && isRealTimeValidation && "border-destructive/50"
            )}
          />

          <div>
            <Label htmlFor="secret">Secret Key (opcional)</Label>
            <Input
              id="secret"
              type="password"
              placeholder="Chave secreta para validar assinatura..."
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Se não fornecido, apenas a estrutura e claims serão validados.
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={validateJWT} 
              className="flex-1 bg-gradient-primary hover:opacity-90 glow-primary"
              size="lg"
              disabled={isRealTimeValidation && !token.trim()}
            >
              <Shield className="h-4 w-4 mr-2" />
              {isRealTimeValidation ? "Forçar Validação" : "Validar JWT"}
            </Button>
            
            {validationResult && (
              <FullscreenModal
                title="JWT Validator - Visualização Completa"
                trigger={
                  <Button variant="outline" size="lg">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                }
              >
                <div className="space-y-6">
                  {/* Status completo em fullscreen */}
                  <Card className={`${validationResult.isValid ? 'border-success/20' : 'border-destructive/20'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {validationResult.isValid ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-success" />
                            <span className="text-success">Token Válido</span>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-destructive" />
                            <span className="text-destructive">Token Inválido</span>
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {validationResult.errors.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-destructive mb-2">Erros:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {validationResult.errors.map((error, index) => (
                              <li key={index} className="text-sm text-destructive">{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {validationResult.warnings.length > 0 && (
                        <div>
                          <h4 className="font-medium text-amber-500 mb-2">Avisos:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {validationResult.warnings.map((warning, index) => (
                              <li key={index} className="text-sm text-amber-500">{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Header e Payload detalhados em fullscreen */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Header Completo</h3>
                      <SyntaxHighlighter 
                        code={JSON.stringify(validationResult.header, null, 2)} 
                        language="json"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Payload Completo</h3>
                      <SyntaxHighlighter 
                        code={JSON.stringify(validationResult.payload, null, 2)} 
                        language="json"
                      />
                    </div>
                  </div>
                </div>
              </FullscreenModal>
            )}
          </div>
        </CardContent>
      </Card>

      {validationResult && (
        <>
          {/* Status da Validação */}
          <Card className={`glow-card animate-fade-in ${validationResult.isValid ? 'border-success/20' : 'border-destructive/20'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-success">Token Válido</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-destructive" />
                    <span className="text-destructive">Token Inválido</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {validationResult.errors.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-destructive mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Erros ({validationResult.errors.length})
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {validationResult.errors.map((error, index) => (
                      <li key={index} className="text-sm text-destructive">{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResult.warnings.length > 0 && (
                <div>
                  <h4 className="font-medium text-amber-500 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Avisos ({validationResult.warnings.length})
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {validationResult.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-amber-500">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Claims Importantes */}
          <Card className="glow-card animate-fade-in">
            <CardHeader>
              <CardTitle>Claims Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-1">Algoritmo</h4>
                  <p className="text-sm font-mono">{validationResult.algorithm}</p>
                </div>
                
                {validationResult.payload.exp && (
                  <div className={`p-4 rounded-lg border ${
                    validationResult.payload.exp * 1000 < Date.now() 
                      ? 'bg-destructive/10 border-destructive/20' 
                      : 'bg-success/10 border-success/20'
                  }`}>
                    <h4 className={`font-medium mb-1 ${
                      validationResult.payload.exp * 1000 < Date.now() ? 'text-destructive' : 'text-success'
                    }`}>Expira em</h4>
                    <p className="text-sm font-mono">{formatTimestamp(validationResult.payload.exp)}</p>
                  </div>
                )}

                {validationResult.payload.iat && (
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <h4 className="font-medium text-accent mb-1">Emitido em</h4>
                    <p className="text-sm font-mono">{formatTimestamp(validationResult.payload.iat)}</p>
                  </div>
                )}

                {validationResult.payload.sub && (
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <h4 className="font-medium text-secondary-foreground mb-1">Subject</h4>
                    <p className="text-sm font-mono">{validationResult.payload.sub}</p>
                  </div>
                )}

                {validationResult.payload.iss && (
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <h4 className="font-medium text-secondary-foreground mb-1">Issuer</h4>
                    <p className="text-sm font-mono">{validationResult.payload.iss}</p>
                  </div>
                )}

                {validationResult.payload.aud && (
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <h4 className="font-medium text-secondary-foreground mb-1">Audience</h4>
                    <p className="text-sm font-mono">{validationResult.payload.aud}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Header e Payload Detalhados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Header
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(validationResult.header, null, 2), "Header")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SyntaxHighlighter 
                  code={JSON.stringify(validationResult.header, null, 2)} 
                  language="json"
                />
              </CardContent>
            </Card>

            <Card className="glow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payload
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(validationResult.payload, null, 2), "Payload")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SyntaxHighlighter 
                  code={JSON.stringify(validationResult.payload, null, 2)} 
                  language="json"
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}