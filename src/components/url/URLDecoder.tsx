import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Link2, AlertCircle, Maximize2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { FullscreenModal } from "@/components/ui/fullscreen-modal";
import { cn } from "@/lib/utils";

export function URLDecoder() {
  const [textInput, setTextInput] = useState("");
  const [decodedOutput, setDecodedOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const decodeFromURL = (input: string, type: 'component' | 'full' = 'component'): string => {
    if (type === 'component') {
      return decodeURIComponent(input);
    } else {
      return decodeURI(input);
    }
  };

  const handleDecode = (type: 'component' | 'full' = 'component') => {
    if (!textInput.trim()) {
      setError("Por favor, insira algum texto para decodificar");
      return;
    }

    try {
      setError("");
      const decoded = decodeFromURL(textInput, type);
      setDecodedOutput(decoded);
      
      toast({
        title: "Texto decodificado!",
        description: `URL ${type === 'component' ? 'Component' : 'Full'} decoding aplicado com sucesso.`,
      });
    } catch (err) {
      setError("Erro ao decodificar texto - formato inválido");
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
    { name: "URL com parâmetros", value: "https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dtech" },
    { name: "Texto com caracteres especiais", value: "Ol%C3%A1!%20Como%20est%C3%A1%3F%20Tudo%20bem%3F%20100%25%20legal!" },
    { name: "JSON codificado", value: "%7B%22name%22%3A%20%22Jo%C3%A3o%22%2C%20%22age%22%3A%2030%2C%20%22city%22%3A%20%22S%C3%A3o%20Paulo%22%7D" },
    { name: "Query string", value: "name%3DJo%C3%A3o%20Silva%26email%3Djoao%40example.com%26age%3D30" }
  ];

  const DecoderContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-secondary">
          <Link2 className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">URL Decoder</h1>
          <p className="text-muted-foreground">
            Decodifique texto codificado para URLs
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
              <CardTitle>Entrada de Texto Codificado</CardTitle>
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
                placeholder="Cole seu texto codificado aqui para decodificar..."
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
                  onClick={() => handleDecode('component')} 
                  className="flex-1 bg-gradient-secondary hover:opacity-90"
                >
                  URL Component Decode
                </Button>
                <Button 
                  onClick={() => handleDecode('full')} 
                  variant="secondary"
                  className="flex-1"
                >
                  URL Full Decode
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
          <CardTitle>Textos Codificados de Exemplo</CardTitle>
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
      {decodedOutput && (
        <Card className="glow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Texto Decodificado
              <div className="flex gap-2">
                <FullscreenModal
                  title="URL Decoder - Visualização Completa"
                  trigger={<Button variant="outline" size="icon"><Maximize2 className="h-4 w-4" /></Button>}
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h3 className="font-medium mb-2">Entrada Codificada:</h3>
                      <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-3 rounded">
                        {textInput}
                      </pre>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h3 className="font-medium mb-2">Saída Decodificada:</h3>
                      <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-3 rounded">
                        {decodedOutput}
                      </pre>
                    </div>
                  </div>
                </FullscreenModal>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(decodedOutput, "Texto decodificado")}
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
                  {decodedOutput.length} caracteres
                </Badge>
                <Badge variant="outline">
                  {new Blob([decodedOutput]).size} bytes
                </Badge>
              </div>
              
              <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                {decodedOutput}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações Úteis */}
      <Card className="glow-card">
        <CardHeader>
          <CardTitle>Diferenças entre URI e URI Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🔧 URI Component</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Decodifica TODOS os caracteres especiais, incluindo símbolos reservados.
              </p>
              <p className="text-xs font-mono bg-muted p-2 rounded">
                %3A → : <br/>
                %2F → / <br/>
                %3F → ? <br/>
                %26 → &
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🌐 URI Full</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Preserva caracteres reservados de URL (: / ? # [ ] @).
              </p>
              <p className="text-xs font-mono bg-muted p-2 rounded">
                %20 → espaço <br/>
                %C3%A1 → á <br/>
                Mas preserva: : / ? #
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return <DecoderContent />;
}