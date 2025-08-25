/**
 * EncodLab Studio - Componente principal da aplicação
 * 
 * Configura os provedores de contexto, roteamento e estrutura geral da aplicação.
 * Inclui configuração de tema, toast notifications, tooltips e queries.
 * 
 * @author Edison Vargas Teixeira
 * @component App
 * @returns {JSX.Element} Aplicação configurada com todos os provedores
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import Index from "./pages/Index";
import Encoder from "./pages/Encoder";
import Validator from "./pages/Validator";
import Generator from "./pages/Generator";
import Base64Encoder from "./pages/Base64Encoder";
import Base64Decoder from "./pages/Base64Decoder";
import URLEncoder from "./pages/URLEncoder";
import URLDecoder from "./pages/URLDecoder";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="encodlab-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/encoder" element={<Encoder />} />
            <Route path="/validator" element={<Validator />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/base64-encoder" element={<Base64Encoder />} />
            <Route path="/base64-decoder" element={<Base64Decoder />} />
            <Route path="/url-encoder" element={<URLEncoder />} />
            <Route path="/url-decoder" element={<URLDecoder />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
