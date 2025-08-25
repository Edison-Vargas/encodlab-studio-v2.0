import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Link, AlertCircle, Maximize2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { FullscreenModal } from "@/components/ui/fullscreen-modal";
import { cn } from "@/lib/utils";

export function URLEncoder() {
  const [textInput, setTextInput] = useState("");
  const [encodedOutput, setEncodedOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const encodeToURL = (input: string, type: 'component' | 'full' = 'component'): string => {
    if (type === 'component') {
      return encodeURIComponent(input);
    } else {
      return encodeURI(input);
    }
  };

  const handleEncode = (type: 'component' | 'full' = 'component') => {
    if (!textInput.trim()) {
      setError("Por favor, insira algum texto para codificar");
      return;
    }

    try {
      setError("");
      const encoded = encodeToURL(textInput, type);
      setEncodedOutput(encoded);
      
      toast({
        title: "Texto codificado!",
        description: `URL ${type === 'component' ? 'Component' : 'Full'} encoding aplicado com sucesso.`,
      });
    } catch (err) {
      setError("Erro ao codificar texto");
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTextInput(content);
        toast({
          title: "Arquivo carregado!",
          description: "Conteúdo do arquivo adicionado ao campo de entrada.",
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Tipo de arquivo não suportado",
        description: "Por favor, use apenas arquivos de texto.",
        variant: "destructive"
      });
    }
  };

  const { isDragOver, dragProps } = useDragDrop({
    onFileDrop: handleFileUpload,
    onTextDrop: setTextInput,
    acceptedTypes: ['text/*']
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copiado!`,
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const sampleTexts = [
    { name: "URL com parâmetros", value: "https://example.com/search?q=hello world&category=tech" },
    { name: "Texto com caracteres especiais", value: "Olá! Como está? Tudo bem? 100% legal!" },
    { name: "JSON", value: '{"name": "João", "age": 30, "city": "São Paulo"}' },
    { name: "Consulta SQL", value: "SELECT * FROM users WHERE name = 'João Silva' AND age > 25" }
  ];

  const EncoderContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Link className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">URL Encoder</h1>
          <p className="text-muted-foreground">
            Codifique texto para uso seguro em URLs
          </p>
        </div>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Texto</TabsTrigger>
          <TabsTrigger value="file">Arquivo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <Card className={cn("glow-card transition-all duration-300", isDragOver && "border-primary/50 bg-primary/5")}>
            <CardHeader>
              <CardTitle>Entrada de Texto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" {...dragProps}>
              {isDragOver && (
                <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-primary font-medium">Solte o arquivo aqui</p>
                  </div>
                </div>
              )}
              
              <Textarea
                placeholder="Cole seu texto aqui para codificar..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEncode('component')} 
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  URL Component Encode
                </Button>
                <Button 
                  onClick={() => handleEncode('full')} 
                  variant="secondary"
                  className="flex-1"
                >
                  URL Full Encode
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="file">
          <Card className={cn("glow-card transition-all duration-300", isDragOver && "border-primary/50 bg-primary/5")}>
            <CardHeader>
              <CardTitle>Upload de Arquivo</CardTitle>
            </CardHeader>
            <CardContent 
              className="min-h-[200px] border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center relative"
              {...dragProps}
            >
              {isDragOver ? (
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium text-primary">Solte o arquivo aqui</p>
                  <p className="text-sm text-muted-foreground">Apenas arquivos de texto são aceitos</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Arraste um arquivo de texto</p>
                  <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
                  <input
                    type="file"
                    accept="text/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Textos de Exemplo */}
      <Card className="glow-card">
        <CardHeader>
          <CardTitle>Textos de Exemplo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleTexts.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left"
                onClick={() => setTextInput(sample.value)}
              >
                <div>
                  <div className="font-medium text-sm">{sample.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                    {sample.value}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saída */}
      {encodedOutput && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Texto Codificado
              <div className="flex gap-2">
                <FullscreenModal
                  title="URL Encoder - Visualização Completa"
                  trigger={<Button variant="outline" size="icon"><Maximize2 className="h-4 w-4" /></Button>}
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h3 className="font-medium mb-2">Entrada:</h3>
                      <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-3 rounded">
                        {textInput}
                      </pre>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h3 className="font-medium mb-2">Saída Codificada:</h3>
                      <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-3 rounded">
                        {encodedOutput}
                      </pre>
                    </div>
                  </div>
                </FullscreenModal>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(encodedOutput, "Texto codificado")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">
                  {encodedOutput.length} caracteres
                </Badge>
                <Badge variant="outline">
                  {new Blob([encodedOutput]).size} bytes
                </Badge>
              </div>
              
              <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                {encodedOutput}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Casos de Uso */}
      <Card className="glow-card">
        <CardHeader>
          <CardTitle>Casos de Uso Comuns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🔗 Parâmetros de URL</h4>
              <p className="text-sm text-muted-foreground">
                Codificar valores de parâmetros em URLs para evitar caracteres especiais
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">📝 Formulários Web</h4>
              <p className="text-sm text-muted-foreground">
                Preparar dados para envio via POST ou GET em formulários
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🔍 Query Strings</h4>
              <p className="text-sm text-muted-foreground">
                Criar consultas seguras para APIs e serviços web
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🌐 Internacionalização</h4>
              <p className="text-sm text-muted-foreground">
                Codificar caracteres especiais e acentos para URLs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return <EncoderContent />;
}