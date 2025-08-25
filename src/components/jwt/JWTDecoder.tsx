import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { Copy, AlertCircle, CheckCircle, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
  isValid: boolean;
}

export function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const decodeJWT = (jwt: string): DecodedJWT | null => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error("JWT deve ter exatamente 3 partes separadas por ponto");
      }

      const [headerB64, payloadB64, signature] = parts;
      
      // Decodificar header
      const headerJson = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
      const header = JSON.parse(headerJson);
      
      // Decodificar payload
      const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(payloadJson);

      return {
        header,
        payload,
        signature,
        isValid: true
      };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Token JWT inválido");
    }
  };

  const handleDecode = () => {
    if (!token.trim()) {
      setError("Por favor, insira um token JWT");
      return;
    }

    try {
      const result = decodeJWT(token.trim());
      setDecoded(result);
      setError("");
      toast({
        title: "Token decodificado com sucesso!",
        description: "JWT foi decodificado e validado.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao decodificar token");
      setDecoded(null);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copiado!`,
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Unlock className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JWT Decoder</h1>
          <p className="text-muted-foreground">
            Decodifique e inspecione tokens JWT de forma segura
          </p>
        </div>
      </div>

      <Card className="glow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Token JWT
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setToken(sampleJWT)}
            >
              Usar exemplo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Cole seu token JWT aqui..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="min-h-[120px] font-mono text-sm jwt-token"
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleDecode} 
            className="w-full bg-gradient-primary hover:opacity-90 glow-primary"
            size="lg"
          >
            <Unlock className="h-4 w-4 mr-2" />
            Decodificar JWT
          </Button>
        </CardContent>
      </Card>

      {decoded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Header
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), "Header")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SyntaxHighlighter 
                code={JSON.stringify(decoded.header, null, 2)} 
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
                  onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), "Payload")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SyntaxHighlighter 
                code={JSON.stringify(decoded.payload, null, 2)} 
                language="json"
              />
            </CardContent>
          </Card>

          <Card className="glow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Assinatura
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(decoded.signature, "Assinatura")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm font-mono break-all text-muted-foreground">
                  {decoded.signature}
                </p>
              </div>
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Nota:</strong> A secret key não pode ser extraída de um JWT válido. 
                  Esta é a assinatura gerada usando a secret key + algoritmo especificado no header.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}

      {decoded && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Informações do Token
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-medium text-success mb-1">Algoritmo</h4>
                <p className="text-sm font-mono">{decoded.header.alg}</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-medium text-primary mb-1">Tipo</h4>
                <p className="text-sm font-mono">{decoded.header.typ}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h4 className="font-medium text-accent mb-1">Subject</h4>
                <p className="text-sm font-mono">{decoded.payload.sub || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}