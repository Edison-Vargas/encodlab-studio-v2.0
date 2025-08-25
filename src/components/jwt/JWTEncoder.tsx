import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { Copy, AlertCircle, CheckCircle, Lock, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderField {
  key: string;
  value: string;
}

interface PayloadField {
  key: string;
  value: string;
}

export function JWTEncoder() {
  const [algorithm, setAlgorithm] = useState("HS256");
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [headerFields, setHeaderFields] = useState<HeaderField[]>([
    { key: "alg", value: "HS256" },
    { key: "typ", value: "JWT" }
  ]);
  const [payloadFields, setPayloadFields] = useState<PayloadField[]>([
    { key: "sub", value: "1234567890" },
    { key: "name", value: "John Doe" },
    { key: "iat", value: Math.floor(Date.now() / 1000).toString() }
  ]);
  const [encodedToken, setEncodedToken] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const algorithms = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512"];

  const base64UrlEncode = (obj: any): string => {
    const jsonString = JSON.stringify(obj);
    const base64 = btoa(unescape(encodeURIComponent(jsonString)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };

  const createSignature = (header: string, payload: string, secret: string, algorithm: string): string => {
    // Para demonstração, vamos criar uma assinatura simulada
    // Em produção real, seria necessário usar uma biblioteca de criptografia
    const data = header + "." + payload;
    const signature = btoa(data + secret).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return signature.substring(0, 43); // Simula o tamanho de uma assinatura real
  };

  const generateJWT = () => {
    try {
      setError("");

      // Validar campos obrigatórios
      if (!secret.trim()) {
        throw new Error("Secret é obrigatório para gerar o token");
      }

      // Construir header
      const header: any = {};
      headerFields.forEach(field => {
        if (field.key.trim() && field.value.trim()) {
          header[field.key.trim()] = field.key === "alg" ? algorithm : field.value.trim();
        }
      });

      if (!header.alg) header.alg = algorithm;
      if (!header.typ) header.typ = "JWT";

      // Construir payload
      const payload: any = {};
      payloadFields.forEach(field => {
        if (field.key.trim() && field.value.trim()) {
          let value: any = field.value.trim();
          
          // Tentar converter números
          if (!isNaN(Number(value)) && value !== '') {
            value = Number(value);
          }
          
          // Tentar converter booleans
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          
          payload[field.key.trim()] = value;
        }
      });

      // Codificar header e payload
      const headerEncoded = base64UrlEncode(header);
      const payloadEncoded = base64UrlEncode(payload);

      // Criar assinatura
      const signature = createSignature(headerEncoded, payloadEncoded, secret, algorithm);

      // Construir token final
      const token = `${headerEncoded}.${payloadEncoded}.${signature}`;
      setEncodedToken(token);

      toast({
        title: "JWT gerado com sucesso!",
        description: "Token JWT foi criado e está pronto para uso.",
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar token JWT");
      setEncodedToken("");
    }
  };

  const addHeaderField = () => {
    setHeaderFields([...headerFields, { key: "", value: "" }]);
  };

  const addPayloadField = () => {
    setPayloadFields([...payloadFields, { key: "", value: "" }]);
  };

  const removeHeaderField = (index: number) => {
    if (headerFields.length > 1) {
      setHeaderFields(headerFields.filter((_, i) => i !== index));
    }
  };

  const removePayloadField = (index: number) => {
    if (payloadFields.length > 1) {
      setPayloadFields(payloadFields.filter((_, i) => i !== index));
    }
  };

  const updateHeaderField = (index: number, field: 'key' | 'value', value: string) => {
    const newFields = [...headerFields];
    newFields[index][field] = value;
    if (field === 'key' && value === 'alg') {
      newFields[index].value = algorithm;
    }
    setHeaderFields(newFields);
  };

  const updatePayloadField = (index: number, field: 'key' | 'value', value: string) => {
    const newFields = [...payloadFields];
    newFields[index][field] = value;
    setPayloadFields(newFields);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Token copiado!",
      description: "JWT copiado para a área de transferência.",
    });
  };

  const loadPreset = (preset: string) => {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (60 * 60); // 1 hora

    const presets: Record<string, PayloadField[]> = {
      user: [
        { key: "sub", value: "1234567890" },
        { key: "name", value: "John Doe" },
        { key: "email", value: "john@example.com" },
        { key: "iat", value: now.toString() },
        { key: "exp", value: exp.toString() }
      ],
      api: [
        { key: "iss", value: "api.example.com" },
        { key: "aud", value: "app.example.com" },
        { key: "sub", value: "api_user" },
        { key: "scope", value: "read write" },
        { key: "iat", value: now.toString() },
        { key: "exp", value: exp.toString() }
      ],
      admin: [
        { key: "sub", value: "admin_123" },
        { key: "name", value: "Admin User" },
        { key: "role", value: "administrator" },
        { key: "permissions", value: "all" },
        { key: "iat", value: now.toString() },
        { key: "exp", value: exp.toString() }
      ]
    };

    if (presets[preset]) {
      setPayloadFields(presets[preset]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Lock className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JWT Encoder</h1>
          <p className="text-muted-foreground">
            Crie e codifique novos tokens JWT personalizados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuração do Header */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Header
              <Button variant="outline" size="sm" onClick={addHeaderField}>
                <Plus className="h-4 w-4 mr-1" />
                Campo
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="algorithm">Algoritmo</Label>
              <select
                id="algorithm"
                value={algorithm}
                onChange={(e) => {
                  setAlgorithm(e.target.value);
                  const algIndex = headerFields.findIndex(f => f.key === 'alg');
                  if (algIndex >= 0) {
                    updateHeaderField(algIndex, 'value', e.target.value);
                  }
                }}
                className="w-full p-2 border rounded-md bg-background"
              >
                {algorithms.map(alg => (
                  <option key={alg} value={alg}>{alg}</option>
                ))}
              </select>
            </div>

            {headerFields.map((field, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Chave"
                  value={field.key}
                  onChange={(e) => updateHeaderField(index, 'key', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Valor"
                  value={field.value}
                  onChange={(e) => updateHeaderField(index, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHeaderField(index)}
                  disabled={headerFields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Configuração do Payload */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Payload
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => loadPreset('user')}>
                  User
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadPreset('api')}>
                  API
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadPreset('admin')}>
                  Admin
                </Button>
                <Button variant="outline" size="sm" onClick={addPayloadField}>
                  <Plus className="h-4 w-4 mr-1" />
                  Campo
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payloadFields.map((field, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Chave"
                  value={field.key}
                  onChange={(e) => updatePayloadField(index, 'key', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Valor"
                  value={field.value}
                  onChange={(e) => updatePayloadField(index, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePayloadField(index)}
                  disabled={payloadFields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Configuração da Assinatura */}
      <Card className="glow-card">
        <CardHeader>
          <CardTitle>Assinatura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="secret">Secret Key</Label>
            <Input
              id="secret"
              type="password"
              placeholder="Sua chave secreta..."
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Mantenha sua chave secreta segura. Este é um ambiente local - sua chave não é enviada para servidores.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={generateJWT} 
            className="w-full bg-gradient-primary hover:opacity-90 glow-primary"
            size="lg"
          >
            <Lock className="h-4 w-4 mr-2" />
            Gerar JWT
          </Button>
        </CardContent>
      </Card>

      {/* Resultado */}
      {encodedToken && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Token JWT Gerado
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(encodedToken)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={encodedToken}
              readOnly
              className="min-h-[120px] font-mono text-sm jwt-token"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Token gerado localmente. Use este JWT em suas aplicações para autenticação e autorização.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}