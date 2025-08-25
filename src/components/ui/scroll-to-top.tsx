/**
 * EncodLab Studio - Componente Scroll to Top
 * 
 * Botão flutuante para rolar a página até o topo com animação suave.
 * Aparece quando o usuário rola para baixo na página.
 * 
 * @author Edison Vargas Teixeira
 * @component ScrollToTop
 */

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Verifica se a página tem conteúdo suficiente para fazer scroll
      const hasScrollableContent = document.body.scrollHeight > window.innerHeight;
      
      // Só mostra o botão se há conteúdo para scroll E o usuário rolou mais de 200px
      if (hasScrollableContent && window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Verifica inicialmente
    toggleVisibility();

    // Adiciona listeners para scroll e resize
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-[9999] h-14 w-14 rounded-full shadow-xl transition-all duration-300 ease-in-out",
        "bg-primary hover:bg-primary/90 hover:scale-110 active:scale-95",
        "border-2 border-primary-glow/30 hover:border-primary-glow/60",
        "backdrop-blur-sm hover:shadow-glow",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
          : "translate-y-8 opacity-0 pointer-events-none scale-75"
      )}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
    >
      <ArrowUp className="h-6 w-6 text-primary-foreground" />
    </Button>
  );
}