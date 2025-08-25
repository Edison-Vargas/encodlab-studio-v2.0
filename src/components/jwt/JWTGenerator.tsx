import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, CheckCircle, Zap, User, Shield, Code, Clock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  name: string;
  description: string;
  icon: React.ReactNode;
  config: {
    algorithm: string;
    payload: Record<string, any>;
    expiresIn: number; // em segundos
  };
}

export function JWTGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [customSecret, setCustomSecret] = useState("your-256-bit-secret");
  const { toast } = useToast();

  const templates: Record<string, Template> = {
    user: {
      name: "Token de Usuário",
      description: "Token para autenticação de usuário com claims básicos",
      icon: <User className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          sub: "user_123",
          name: "João Silva",
          email: "joao@example.com",
          role: "user",
          iat: Math.floor(Date.now() / 1000)
        },
        expiresIn: 3600 // 1 hora
      }
    },
    admin: {
      name: "Token de Admin",
      description: "Token com privilégios administrativos",
      icon: <Shield className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          sub: "admin_456",
          name: "Admin User",
          email: "admin@example.com",
          role: "administrator",
          permissions: ["read", "write", "delete", "admin"],
          iat: Math.floor(Date.now() / 1000)
        },
        expiresIn: 1800 // 30 minutos
      }
    },
    api: {
      name: "Token de API",
      description: "Token para comunicação entre serviços",
      icon: <Code className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          iss: "api.myservice.com",
          aud: "external-api",
          sub: "service_account",
          scope: "read:data write:data",
          client_id: "abc123",
          iat: Math.floor(Date.now() / 1000)
        },
        expiresIn: 7200 // 2 horas
      }
    },
    testing: {
      name: "Token de Teste",
      description: "Token com claims variados para testes",
      icon: <Settings className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          sub: "test_user",
          name: "Test User",
          email: "test@example.com",
          role: "tester",
          environment: "development",
          feature_flags: ["feature_a", "feature_b"],
          iat: Math.floor(Date.now() / 1000)
        },
        expiresIn: 300 // 5 minutos
      }
    },
    expired: {
      name: "Token Expirado",
      description: "Token já expirado para testes de validação",
      icon: <Clock className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          sub: "expired_user",
          name: "Expired User",
          email: "expired@example.com",
          iat: Math.floor(Date.now() / 1000) - 7200, // emitido há 2 horas
          exp: Math.floor(Date.now() / 1000) - 3600  // expirou há 1 hora
        },
        expiresIn: 0 // já expirado
      }
    },
    longLived: {
      name: "Token de Longa Duração",
      description: "Token com validade extendida",
      icon: <Clock className="h-5 w-5" />,
      config: {
        algorithm: "HS256",
        payload: {
          sub: "long_lived_user",
          name: "Long Lived User",
          email: "longlived@example.com",
          role: "premium_user",
          subscription: "premium",
          iat: Math.floor(Date.now() / 1000)
        },
        expiresIn: 2592000 // 30 dias
      }
    }
  };

  const base64UrlEncode = (obj: any): string => {
    const jsonString = JSON.stringify(obj);
    const base64 = btoa(unescape(encodeURIComponent(jsonString)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };

  const createSignature = (header: string, payload: string, secret: string): string => {
    const data = header + "." + payload;
    const signature = btoa(data + secret).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return signature.substring(0, 43);
  };

  const generateToken = (templateKey: string) => {
    try {
      const template = templates[templateKey];
      if (!template) return;

      const now = Math.floor(Date.now() / 1000);
      
      // Construir header
      const header = {
        alg: template.config.algorithm,
        typ: "JWT"
      };

      // Construir payload com timestamps atualizados
      const payload: any = {
        ...template.config.payload,
        iat: template.config.payload.iat || now
      };

      // Adicionar exp se não existir e expiresIn > 0
      if (!payload.exp && template.config.expiresIn > 0) {
        payload.exp = now + template.config.expiresIn;
      }

      // Codificar partes
      const headerEncoded = base64UrlEncode(header);
      const payloadEncoded = base64UrlEncode(payload);
      const signature = createSignature(headerEncoded, payloadEncoded, customSecret);

      const token = `${headerEncoded}.${payloadEncoded}.${signature}`;
      
      // Adicionar à lista de tokens gerados
      setGeneratedTokens(prev => [token, ...prev.slice(0, 9)]); // máximo 10 tokens

      toast({
        title: `${template.name} gerado!`,
        description: "Token adicionado à lista de tokens gerados.",
      });

    } catch (error) {
      toast({
        title: "Erro ao gerar token",
        description: "Ocorreu um erro ao gerar o token JWT.",
        variant: "destructive"
      });
    }
  };

  const generateAllTokens = () => {
    Object.keys(templates).forEach(templateKey => {
      generateToken(templateKey);
    });
    
    toast({
      title: "Todos os tokens gerados!",
      description: "Suite completa de tokens JWT para teste criada.",
    });
  };

  const copyToClipboard = (text: string, templateName?: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Token copiado!",
      description: templateName ? `Token ${templateName} copiado para a área de transferência.` : "Token copiado para a área de transferência.",
    });
  };

  const clearTokens = () => {
    setGeneratedTokens([]);
    toast({
      title: "Tokens limpos",
      description: "Lista de tokens gerados foi limpa.",
    });
  };

  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return "Expirado";
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JWT Generator</h1>
          <p className="text-muted-foreground">
            Gere tokens JWT para diferentes cenários de teste e desenvolvimento
          </p>
        </div>
      </div>

      {/* Configuração Global */}
      <Card className="glow-card">
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="secret">Secret Key</Label>
            <Input
              id="secret"
              type="password"
              placeholder="Chave secreta para assinar tokens..."
              value={customSecret}
              onChange={(e) => setCustomSecret(e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={generateAllTokens}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Zap className="h-4 w-4 mr-2" />
              Gerar Todos os Tokens
            </Button>
            
            {generatedTokens.length > 0 && (
              <Button variant="outline" onClick={clearTokens}>
                Limpar Lista
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Templates de Token */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(templates).map(([key, template]) => (
          <Card key={key} className="glow-card hover-scale cursor-pointer transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                {template.icon}
                {template.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Algoritmo:</span>
                <span className="font-mono">{template.config.algorithm}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Validade:</span>
                <span className="font-mono">{formatDuration(template.config.expiresIn)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Claims:</span>
                <span className="font-mono">{Object.keys(template.config.payload).length}</span>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => generateToken(key)}
                variant="outline"
              >
                <Zap className="h-4 w-4 mr-2" />
                Gerar Token
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tokens Gerados */}
      {generatedTokens.length > 0 && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Tokens Gerados ({generatedTokens.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedTokens.map((token, index) => (
              <div key={index} className="relative">
                <Textarea
                  value={token}
                  readOnly
                  className="pr-12 font-mono text-sm jwt-token resize-none"
                  style={{ height: '80px' }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(token)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="text-xs text-muted-foreground mt-1">
                  Token #{generatedTokens.length - index} • Gerado há poucos instantes
                </div>
              </div>
            ))}
            
            {generatedTokens.length >= 10 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Mostrando os 10 tokens mais recentes. Tokens mais antigos são removidos automaticamente.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}