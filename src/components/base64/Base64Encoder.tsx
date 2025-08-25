import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, AlertCircle, CheckCircle, Lock, FileText, Image, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDragDrop } from "@/hooks/use-drag-drop";

export function Base64Encoder() {
  const [textInput, setTextInput] = useState("");
  const [encodedOutput, setEncodedOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Drag and drop functionality
  const handleFileDrop = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        if (file.type.startsWith('text/')) {
          setTextInput(result);
        } else {
          // For non-text files, use the data URL directly
          setTextInput(result);
        }
        toast({
          title: "Arquivo carregado!",
          description: "Arquivo adicionado ao campo de entrada.",
        });
      }
    };
    
    if (file.type.startsWith('text/')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const { isDragOver, dragProps } = useDragDrop({
    onFileDrop: handleFileDrop,
    onTextDrop: setTextInput
  });

  const encodeToBase64 = (input: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch (err) {
      throw new Error("Erro ao codificar texto em Base64");
    }
  };

  const handleEncode = () => {
    if (!textInput.trim()) {
      setError("Por favor, insira um texto para codificar");
      return;
    }

    try {
      const encoded = encodeToBase64(textInput);
      setEncodedOutput(encoded);
      setError("");
      toast({
        title: "Texto codificado com sucesso!",
        description: "Conteúdo foi convertido para Base64.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao codificar texto");
      setEncodedOutput("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        // Remove o prefixo data URL se existir
        const base64Data = result.includes(',') ? result.split(',')[1] : result;
        setEncodedOutput(base64Data);
        setTextInput(`[Arquivo: ${file.name}]`);
        setError("");
        toast({
          title: "Arquivo codificado!",
          description: `${file.name} foi convertido para Base64.`,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copiado!`,
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const sampleTexts = {
    simple: "Hello, World!",
    json: '{"name": "João", "role": "developer", "active": true}',
    html: '<div class="container"><h1>Título</h1><p>Conteúdo do parágrafo</p></div>',
    url: "https://api.exemplo.com/users/123?format=json&fields=name,email"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary glow-primary">
          <Lock className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Base64 Encoder</h1>
          <p className="text-muted-foreground">
            Codifique texto, JSON, HTML ou arquivos para Base64 de forma segura
          </p>
        </div>
      </div>

      <Tabs defaultValue="text" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Texto
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Arquivo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-6">
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Texto para Codificar
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTextInput(sampleTexts.simple)}
                  >
                    Texto
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTextInput(sampleTexts.json)}
                  >
                    JSON
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTextInput(sampleTexts.html)}
                  >
                    HTML
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Digite ou cole o texto que deseja codificar em Base64..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleEncode} 
                className="w-full bg-gradient-primary hover:opacity-90 glow-primary"
                size="lg"
              >
                <Lock className="h-4 w-4 mr-2" />
                Codificar para Base64
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file" className="space-y-6">
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Upload de Arquivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Selecione um arquivo para codificar em Base64
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </div>
              
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Suportados:</strong> Imagens, documentos, arquivos de texto e outros tipos de arquivo.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {encodedOutput && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Resultado Base64
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(encodedOutput, "Base64")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={encodedOutput}
                readOnly
                className="min-h-[120px] font-mono text-sm jwt-token"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-medium text-success mb-1">Caracteres</h4>
                  <p className="text-sm font-mono">{encodedOutput.length.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-1">Tamanho</h4>
                  <p className="text-sm font-mono">{(encodedOutput.length * 0.75).toFixed(0)} bytes</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-medium text-accent mb-1">Formato</h4>
                  <p className="text-sm font-mono">Base64</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Casos de Uso Comuns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <strong>🔐 Autenticação</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Codificar credenciais para Basic Auth
                </p>
              </div>
              <div className="p-3 rounded border">
                <strong>📧 Email</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Anexos e conteúdo de email
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <strong>🖼️ Imagens</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Data URLs e embedding de imagens
                </p>
              </div>
                <div className="p-3 rounded border">
                  <strong>📊 APIs</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Transferência segura de dados binários
                  </p>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}