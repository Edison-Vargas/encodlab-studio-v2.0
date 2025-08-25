import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Unlock, 
  Lock, 
  Shield, 
  Zap, 
  Info, 
  AlertTriangle, 
  CheckCircle,
  Code,
  Eye,
  Key,
  Clock,
  User,
  Globe,
  Binary,
  FileCode,
  Image,
  FileText
} from "lucide-react";

export default function Documentation() {
  const jwtExample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const headerExample = `{
  "alg": "HS256",
  "typ": "JWT"
}`;

  const payloadExample = `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516325422,
  "role": "user",
  "email": "john@example.com"
}`;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-gradient-primary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Documentação Completa</h1>
            <p className="text-xl text-muted-foreground">
              Guia definitivo para JWT e Base64 - Tudo que você precisa saber
            </p>
          </div>
        </div>

        {/* Introdução Geral */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                JWT (JSON Web Tokens)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Padrão seguro para transmissão de informações entre partes como objeto JSON compacto.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">RFC 7519</Badge>
                <Badge variant="secondary">Stateless</Badge>
                <Badge variant="secondary">Self-contained</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Binary className="h-5 w-5" />
                Base64 Encoding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Sistema de codificação que converte dados binários em texto ASCII usando 64 caracteres.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Universal</Badge>
                <Badge variant="secondary">Web-safe</Badge>
                <Badge variant="secondary">Reversível</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Seção JWT Detalhada */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Info className="h-6 w-6" />
              JSON Web Token (JWT) - Estrutura Completa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">
              JWT é um padrão aberto (RFC 7519) que define uma forma compacta e auto-contida 
              para transmitir informações com segurança entre partes como um objeto JSON.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Header</h4>
                <p className="text-sm text-muted-foreground">
                  Contém o tipo do token e algoritmo de assinatura
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h4 className="font-semibold text-accent mb-2">Payload</h4>
                <p className="text-sm text-muted-foreground">
                  Contém as claims (declarações) sobre o usuário
                </p>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-semibold text-success mb-2">Signature</h4>
                <p className="text-sm text-muted-foreground">
                  Garante que o token não foi alterado
                </p>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Estrutura:</strong> Um JWT é composto por três partes separadas por pontos: 
                <code className="mx-1 p-1 bg-muted rounded">header.payload.signature</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Seção de Segurança JWT */}
        <Card className="glow-card border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-warning">
              <Shield className="h-6 w-6" />
              Segurança JWT - Conceitos Fundamentais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Assinatura e Secret Key */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Assinatura e Secret Key
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Como funciona a assinatura:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside ml-2">
                      <li>O servidor combina header + payload</li>
                      <li>Aplica o algoritmo (ex: HMAC-SHA256)</li>
                      <li>Usa a secret key para gerar o hash</li>
                      <li>Anexa o hash como assinatura</li>
                    </ol>
                  </div>
                  
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Processo:</strong> 
                      <code className="block mt-1 p-2 bg-muted rounded text-xs">
                        signature = HMACSHA256(<br/>
                        &nbsp;&nbsp;base64UrlEncode(header) + "." +<br/>
                        &nbsp;&nbsp;base64UrlEncode(payload),<br/>
                        &nbsp;&nbsp;secret_key<br/>
                        )
                      </code>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">⚠️ Importante sobre Secret Key:</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                      <li><strong>Não está no token:</strong> A secret key nunca é incluída no JWT</li>
                      <li><strong>Não pode ser extraída:</strong> É impossível recuperar a secret key do token</li>
                      <li><strong>Só para verificação:</strong> Usada apenas para validar a assinatura</li>
                      <li><strong>Deve ser segura:</strong> Mantenha sempre em segredo no servidor</li>
                    </ul>
                  </div>
                  
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Nunca exponha a secret key!</strong> Se comprometida, todos os tokens podem ser falsificados.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>

            <Separator />

            {/* Boas Práticas de Segurança */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Boas Práticas de Segurança
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-success">✅ Faça sempre:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Use HTTPS:</strong> Sempre transmita tokens em conexões seguras</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Defina expiração:</strong> Use campos <code>exp</code> para limitar validade</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Valide sempre:</strong> Verifique assinatura e claims em cada uso</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Rotacione chaves:</strong> Mude secret keys periodicamente</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Minimize dados:</strong> Inclua apenas informações necessárias</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-destructive">❌ Nunca faça:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong>Senhas no payload:</strong> Nunca inclua dados sensíveis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong>Secret key no frontend:</strong> Mantenha sempre no servidor</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong>Tokens sem expiração:</strong> Sempre defina um prazo limite</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong>Algoritmo "none":</strong> Evite tokens sem assinatura</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong>Chaves fracas:</strong> Use chaves complexas com 256+ bits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Algoritmos de Assinatura */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code className="h-5 w-5 text-accent" />
                Algoritmos de Assinatura
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-semibold text-accent mb-2">HMAC (Simétrico)</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>HS256:</strong> HMAC + SHA256</li>
                    <li><strong>HS384:</strong> HMAC + SHA384</li>
                    <li><strong>HS512:</strong> HMAC + SHA512</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Mesma chave para assinar e verificar
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">RSA (Assimétrico)</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>RS256:</strong> RSA + SHA256</li>
                    <li><strong>RS384:</strong> RSA + SHA384</li>
                    <li><strong>RS512:</strong> RSA + SHA512</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Chave privada para assinar, pública para verificar
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-semibold text-success mb-2">ECDSA (Curva Elíptica)</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>ES256:</strong> ECDSA + SHA256</li>
                    <li><strong>ES384:</strong> ECDSA + SHA384</li>
                    <li><strong>ES512:</strong> ECDSA + SHA512</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Mais eficiente que RSA, mesmo nível de segurança
                  </p>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Recomendação:</strong> Para aplicações web modernas, use <code>HS256</code> para simplicidade 
                ou <code>RS256</code> quando precisar de chaves assimétricas (microserviços).
              </AlertDescription>
            </Alert>

          </CardContent>
        </Card>

        {/* Seção Base64 Detalhada */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Binary className="h-6 w-6" />
              Base64 Encoding - Sistema Universal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">
              Base64 é um esquema de codificação que converte dados binários em uma representação 
              textual usando um alfabeto de 64 caracteres seguros para texto (A-Z, a-z, 0-9, +, /).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Vantagens do Base64:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Compatível com sistemas de texto
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Preserva integridade dos dados binários
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Usado em protocolos web (HTTP, email)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Suporte universal em linguagens
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-accent">Casos de Uso:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-accent" />
                    Data URLs para imagens inline
                  </li>
                  <li className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-accent" />
                    Basic Authentication HTTP
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    Anexos de email (MIME)
                  </li>
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-accent" />
                    Transferência de dados em APIs
                  </li>
                </ul>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Base64 não é criptografia! É apenas codificação. 
                Para segurança, combine com HTTPS e outras medidas de proteção.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Ferramentas */}
        <Tabs defaultValue="decoder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="decoder" className="flex items-center gap-2">
              <Unlock className="h-4 w-4" />
              JWT Decoder
            </TabsTrigger>
            <TabsTrigger value="encoder" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              JWT Encoder
            </TabsTrigger>
            <TabsTrigger value="validator" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              JWT Validator
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              JWT Generator
            </TabsTrigger>
            <TabsTrigger value="base64-encoder" className="flex items-center gap-2">
              <Binary className="h-4 w-4" />
              Base64 Encoder
            </TabsTrigger>
            <TabsTrigger value="base64-decoder" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Base64 Decoder
            </TabsTrigger>
          </TabsList>

          {/* JWT Decoder */}
          <TabsContent value="decoder" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Unlock className="h-5 w-5" />
                  JWT Decoder - Decodificação Segura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Cole seu token JWT na área de texto</li>
                    <li>Clique em "Decodificar JWT"</li>
                    <li>Visualize o header e payload decodificados</li>
                    <li>Use os botões de copiar para extrair as informações</li>
                  </ol>
                </div>

                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Segurança:</strong> A decodificação é feita localmente no seu navegador. 
                    Nenhum token é enviado para servidores externos.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h4 className="font-semibold">Exemplo de Token JWT:</h4>
                  <SyntaxHighlighter code={jwtExample} language="javascript" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Header Decodificado:</h5>
                      <SyntaxHighlighter code={headerExample} language="json" />
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Payload Decodificado:</h5>
                      <SyntaxHighlighter code={payloadExample} language="json" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Dicas Importantes:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Verifique sempre o campo <code>exp</code> para tokens expirados</li>
                    <li>O campo <code>iat</code> mostra quando o token foi emitido</li>
                    <li>Claims personalizadas podem conter informações específicas da aplicação</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JWT Encoder */}
          <TabsContent value="encoder" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  JWT Encoder - Criação Personalizada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Configure o algoritmo de assinatura (Header)</li>
                    <li>Adicione campos personalizados no Header se necessário</li>
                    <li>Preencha o Payload com as claims desejadas</li>
                    <li>Use os presets (User, API, Admin) para começar rapidamente</li>
                    <li>Defina sua chave secreta</li>
                    <li>Clique em "Gerar JWT" para criar o token</li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Claims Importantes
                    </h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="w-full justify-start">
                        <strong>sub:</strong> Subject (ID do usuário)
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <strong>iat:</strong> Issued At (timestamp de criação)
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <strong>exp:</strong> Expiration (timestamp de expiração)
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <strong>iss:</strong> Issuer (quem emitiu o token)
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <strong>aud:</strong> Audience (para quem é destinado)
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Presets Disponíveis
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded border">
                        <strong>User:</strong> Token básico de usuário com claims essenciais
                      </div>
                      <div className="p-3 rounded border">
                        <strong>API:</strong> Token para comunicação entre serviços
                      </div>
                      <div className="p-3 rounded border">
                        <strong>Admin:</strong> Token com permissões administrativas
                      </div>
                    </div>
                  </div>
                </div>

                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Segurança:</strong> Nunca compartilhe sua chave secreta! 
                    Use chaves complexas em produção e rotacione-as regularmente.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JWT Validator */}
          <TabsContent value="validator" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  JWT Validator - Verificação Completa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Cole o token JWT que deseja validar</li>
                    <li>Insira a chave secreta correspondente</li>
                    <li>Selecione o algoritmo usado na criação</li>
                    <li>Clique em "Validar JWT"</li>
                    <li>Analise o relatório detalhado de validação</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">O que é verificado:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Estrutura do token (3 partes)
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Decodificação do header e payload
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Verificação da assinatura
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Validação de expiração (exp)
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Verificação de emissão (iat)
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Compatibilidade do algoritmo
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    O validator verifica se o token é válido, não foi alterado e ainda está dentro 
                    do prazo de validade. Use esta ferramenta para debug de autenticação.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JWT Generator */}
          <TabsContent value="generator" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  JWT Generator - Suite de Testes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Configure sua chave secreta global</li>
                    <li>Escolha templates pré-definidos para diferentes cenários</li>
                    <li>Gere tokens individuais ou toda a suite de uma vez</li>
                    <li>Use os tokens gerados para testar suas aplicações</li>
                    <li>Copie tokens específicos conforme necessário</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Templates Disponíveis:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 rounded border border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4" />
                          <strong>Token de Usuário</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Autentica usuários comuns com claims básicos (1h de validade)
                        </p>
                      </div>
                      
                      <div className="p-3 rounded border border-accent/20 bg-accent/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4" />
                          <strong>Token de Admin</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Privilégios administrativos completos (30min de validade)
                        </p>
                      </div>

                      <div className="p-3 rounded border border-success/20 bg-success/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4" />
                          <strong>Token de API</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comunicação entre serviços (2h de validade)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded border border-warning/20 bg-warning/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4" />
                          <strong>Token de Teste</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Claims variados para testes (5min de validade)
                        </p>
                      </div>

                      <div className="p-3 rounded border border-destructive/20 bg-destructive/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4" />
                          <strong>Token Expirado</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Já expirado para testar validação de tempo
                        </p>
                      </div>

                      <div className="p-3 rounded border border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4" />
                          <strong>Token Longa Duração</strong>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Validade estendida para usuários premium (30 dias)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    Use "Gerar Todos os Tokens" para criar uma suite completa de testes. 
                    Ideal para testar diferentes cenários de autenticação na sua aplicação.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Base64 Encoder */}
          <TabsContent value="base64-encoder" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Binary className="h-5 w-5" />
                  Base64 Encoder - Codificação Universal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Digite ou cole o texto que deseja codificar</li>
                    <li>Use os botões de exemplo para testar diferentes formatos</li>
                    <li>Alternativamente, faça upload de um arquivo (imagens, documentos, etc.)</li>
                    <li>Clique em "Codificar para Base64"</li>
                    <li>Copie o resultado ou analise as estatísticas</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Tipos de Conteúdo Suportados:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        Texto simples e UTF-8
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Code className="h-4 w-4 text-primary" />
                        JSON e dados estruturados
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        HTML e markup
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Image className="h-4 w-4 text-accent" />
                        Imagens (PNG, JPG, GIF, SVG)
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-accent" />
                        Documentos (PDF, DOC, etc.)
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Binary className="h-4 w-4 text-accent" />
                        Qualquer arquivo binário
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Casos de Uso:</strong> Embedding de imagens em HTML/CSS, Basic Auth, 
                    transferência de dados em APIs, anexos de email e muito mais.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-semibold">Exemplo de Codificação:</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Entrada:</strong> "Hello, World! 🙂"</p>
                    <p className="text-sm"><strong>Base64:</strong> SGVsbG8sIFdvcmxkISDwn5mA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Base64 Decoder */}
          <TabsContent value="base64-decoder" className="space-y-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Base64 Decoder - Decodificação Inteligente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Como usar:</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Cole o conteúdo Base64 que deseja decodificar</li>
                    <li>Use os exemplos para testar diferentes tipos de dados</li>
                    <li>Clique em "Decodificar Base64"</li>
                    <li>Visualize o conteúdo decodificado com detecção automática de tipo</li>
                    <li>Use os botões de copiar ou download conforme necessário</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Recursos Avançados:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4 text-success" />
                        Detecção automática de tipo de conteúdo
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Code className="h-4 w-4 text-success" />
                        Formatação automática de JSON
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Image className="h-4 w-4 text-success" />
                        Suporte a Data URLs completos
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-accent" />
                        Estatísticas detalhadas do conteúdo
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Binary className="h-4 w-4 text-accent" />
                        Download direto de arquivos decodificados
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Validação de integridade dos dados
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Detecção Inteligente:</strong> A ferramenta detecta automaticamente se o conteúdo 
                    é texto, JSON, imagem ou outros tipos de arquivo, apresentando a melhor visualização.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-semibold">Exemplo com Data URL:</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Entrada:</strong> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==</p>
                    <p className="text-sm"><strong>Resultado:</strong> Imagem PNG 1x1 pixel detectada automaticamente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Boas Práticas */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6" />
              Boas Práticas e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-success">✅ Faça</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Use HTTPS sempre para transmitir JWTs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Defina tempo de expiração apropriado
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Use chaves secretas complexas e únicas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Valide tokens em todas as requisições
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Implemente refresh tokens para sessões longas
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-destructive">❌ Evite</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Armazenar informações sensíveis no payload
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Usar tokens sem expiração
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Transmitir chaves secretas no client-side
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Confiar apenas na validação client-side
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Reutilizar a mesma chave em ambientes diferentes
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casos de Uso */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6" />
              Casos de Uso Comuns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔐 Autenticação Web</h3>
                <p className="text-sm text-muted-foreground">
                  Use JWTs para autenticar usuários em SPAs (Single Page Applications). 
                  Armazene o token no localStorage ou sessionStorage e inclua no header Authorization.
                </p>
                <SyntaxHighlighter 
                  code={`Authorization: Bearer ${jwtExample.substring(0, 50)}...`} 
                  language="javascript" 
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔗 API Gateway</h3>
                <p className="text-sm text-muted-foreground">
                  Tokens JWT podem carregar informações de autorização entre microsserviços, 
                  eliminando a necessidade de consultas constantes ao banco de dados.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">📱 Mobile Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Ideais para aplicações móveis devido ao tamanho compacto e capacidade 
                  de verificação offline da estrutura do token.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔄 Single Sign-On (SSO)</h3>
                <p className="text-sm text-muted-foreground">
                  Permita que usuários se autentiquem uma vez e acessem múltiplas aplicações 
                  com o mesmo token, desde que seja válido e confiável.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}