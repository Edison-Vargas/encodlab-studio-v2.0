import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, AlertCircle, CheckCircle, Unlock, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DecodedResult {
  text: string;
  isImage: boolean;
  isJSON: boolean;
  mimeType?: string;
  size: number;
}

export function Base64Decoder() {
  const [encodedInput, setEncodedInput] = useState("");
  const [decodedResult, setDecodedResult] = useState<DecodedResult | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const detectImageFormat = (bytes: Uint8Array): string | null => {
    // PNG: 89 50 4E 47
    if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
      return 'image/png';
    }
    // JPEG: FF D8 FF
    if (bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
      return 'image/jpeg';
    }
    // GIF: 47 49 46 38
    if (bytes.length >= 4 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
      return 'image/gif';
    }
    // WebP: 52 49 46 46 ... 57 45 42 50
    if (bytes.length >= 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
      return 'image/webp';
    }
    // BMP: 42 4D
    if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4D) {
      return 'image/bmp';
    }
    // SVG: texto começando com < (pode ser XML/SVG)
    if (bytes.length >= 1 && bytes[0] === 0x3C) {
      const text = new TextDecoder().decode(bytes.slice(0, 100));
      if (text.includes('<svg') || text.includes('<?xml')) {
        return 'image/svg+xml';
      }
    }
    return null;
  };

  const decodeFromBase64 = (input: string): DecodedResult => {
    try {
      // Remove espaços e quebras de linha
      const cleanInput = input.replace(/\s/g, '');
      
      // Verifica se é um data URL
      let base64Data = cleanInput;
      let mimeType: string | undefined;
      
      if (cleanInput.startsWith('data:')) {
        const matches = cleanInput.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      }

      // Decodifica o Base64
      const decoded = atob(base64Data);
      
      // Converte para bytes para detecção de formato
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      
      // Detecta formato de imagem pelos magic numbers se não tiver MIME type
      if (!mimeType) {
        const detectedMimeType = detectImageFormat(bytes);
        if (detectedMimeType) {
          mimeType = detectedMimeType;
        }
      }
      
      // Verifica se é uma imagem pelo MIME type
      const isImage = mimeType?.startsWith('image/') || false;
      
      // Para dados binários (como imagens), não fazemos conversão UTF-8
      let decodedText: string;
      if (isImage) {
        // Para imagens, mantemos os dados binários como estão
        decodedText = decoded;
      } else {
        // Para texto, fazemos a conversão UTF-8
        try {
          decodedText = decodeURIComponent(escape(decoded));
        } catch {
          // Se falhar na conversão UTF-8, provavelmente é dados binários
          decodedText = decoded;
        }
      }
      
      // Verifica se é JSON válido (apenas para texto)
      let isJSON = false;
      if (!isImage) {
        try {
          JSON.parse(decodedText);
          isJSON = true;
        } catch {
          // Não é JSON válido
        }
      }

      return {
        text: decodedText,
        isImage,
        isJSON,
        mimeType,
        size: decoded.length
      };
    } catch (err) {
      throw new Error("Base64 inválido ou corrompido");
    }
  };

  const handleDecode = () => {
    if (!encodedInput.trim()) {
      setError("Por favor, insira um texto Base64 para decodificar");
      return;
    }

    try {
      const result = decodeFromBase64(encodedInput.trim());
      setDecodedResult(result);
      setError("");
      toast({
        title: "Base64 decodificado com sucesso!",
        description: "Conteúdo foi convertido de Base64.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao decodificar Base64");
      setDecodedResult(null);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copiado!`,
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const downloadAsFile = () => {
    if (!decodedResult) return;

    // Para dados binários (imagens), criamos um array buffer
    let blob: Blob;
    let filename: string;
    
    if (decodedResult.isImage) {
      // Converte string binária para Uint8Array
      const bytes = new Uint8Array(decodedResult.text.length);
      for (let i = 0; i < decodedResult.text.length; i++) {
        bytes[i] = decodedResult.text.charCodeAt(i);
      }
      blob = new Blob([bytes], { type: decodedResult.mimeType || 'application/octet-stream' });
      
      // Determina extensão baseada no MIME type
      const extension = decodedResult.mimeType?.split('/')[1] || 'bin';
      filename = `decoded-image.${extension}`;
    } else {
      // Para texto, usa como string normal
      blob = new Blob([decodedResult.text], { 
        type: decodedResult.mimeType || 'text/plain' 
      });
      filename = `decoded-content.${decodedResult.isJSON ? 'json' : 'txt'}`;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "Arquivo decodificado foi baixado.",
    });
  };

  const sampleBase64 = {
    text: "SGVsbG8sIFdvcmxkISDwn5mA",
    json: "eyJuYW1lIjogIkpvw6NvIiwgInJvbGUiOiAiZGV2ZWxvcGVyIiwgImFjdGl2ZSI6IHRydWV9",
    html: "PGRpdiBjbGFzcz0iY29udGFpbmVyIj4KICA8aDE+VMOtdHVsbzwvaDE+CiAgPHA+Q29udGXDumRvIGRvIHBhcsOhZ3JhZm88L3A+CjwvZGl2Pg=="
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-accent glow-primary">
          <Unlock className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Base64 Decoder</h1>
          <p className="text-muted-foreground">
            Decodifique Base64 para texto, JSON, HTML ou outros formatos
          </p>
        </div>
      </div>

      <Card className="glow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Base64 para Decodificar
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEncodedInput(sampleBase64.text)}
              >
                Texto
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEncodedInput(sampleBase64.json)}
              >
                JSON
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEncodedInput(sampleBase64.html)}
              >
                HTML
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Cole o Base64 que deseja decodificar aqui..."
            value={encodedInput}
            onChange={(e) => setEncodedInput(e.target.value)}
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
            className="w-full bg-gradient-accent hover:opacity-90 glow-primary"
            size="lg"
          >
            <Unlock className="h-4 w-4 mr-2" />
            Decodificar Base64
          </Button>
        </CardContent>
      </Card>

      {decodedResult && (
        <div className="space-y-6">
          {/* Informações do Resultado */}
          <Card className="glow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Informações do Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-medium text-success mb-1">Tamanho</h4>
                  <p className="text-sm font-mono">{decodedResult.size} bytes</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-1">Tipo</h4>
                  <p className="text-sm font-mono">
                    {decodedResult.isJSON ? 'JSON' : decodedResult.isImage ? 'Imagem' : 'Texto'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-medium text-accent mb-1">MIME Type</h4>
                  <p className="text-sm font-mono">{decodedResult.mimeType || 'text/plain'}</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-medium text-warning mb-1">Caracteres</h4>
                  <p className="text-sm font-mono">{decodedResult.text.length.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultado Decodificado */}
          <Card className="glow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Conteúdo Decodificado
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(decodedResult.text, "Conteúdo")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadAsFile}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {decodedResult.isImage ? (
                <div className="space-y-4">
                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      Imagem detectada automaticamente ({decodedResult.mimeType}). Prévia disponível abaixo.
                    </AlertDescription>
                  </Alert>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="text-center space-y-4">
                      <div className="inline-block p-2 bg-background rounded-lg shadow-lg">
                        <img 
                          src={`data:${decodedResult.mimeType};base64,${encodedInput.replace(/\s/g, '').replace(/^data:[^;]+;base64,/, '')}`}
                          alt="Imagem decodificada"
                          className="max-w-full max-h-96 object-contain rounded"
                          onLoad={() => {
                            toast({
                              title: "Imagem carregada!",
                              description: "Prévia da imagem decodificada disponível.",
                            });
                          }}
                          onError={() => {
                            toast({
                              title: "Erro ao carregar imagem",
                              description: "Use o botão de download para salvar o arquivo.",
                              variant: "destructive"
                            });
                          }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Dimensões serão ajustadas automaticamente • Clique em download para salvar
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Textarea
                  value={decodedResult.text}
                  readOnly
                  className={`min-h-[200px] font-mono text-sm ${
                    decodedResult.isJSON ? 'jwt-token' : ''
                  }`}
                />
              )}
            </CardContent>
          </Card>

          {/* JSON Formatting */}
          {decodedResult.isJSON && (
            <Card className="glow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  JSON Formatado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-card border rounded-lg p-4 overflow-auto text-sm font-mono">
                  <code>{JSON.stringify(JSON.parse(decodedResult.text), null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card className="glow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Dicas de Uso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <strong>🔍 Data URLs</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Suporte completo para data: URLs com MIME types
                </p>
              </div>
              <div className="p-3 rounded border">
                <strong>📄 JSON</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Detecção automática e formatação de JSON
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <strong>🖼️ Imagens</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Detecção de conteúdo de imagem com download
                </p>
              </div>
              <div className="p-3 rounded border">
                <strong>📝 Texto</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Suporte a UTF-8 e caracteres especiais
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}