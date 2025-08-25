/**
 * EncodLab Studio - Layout principal da aplicação
 * 
 * Componente de layout responsável por estruturar a interface com sidebar,
 * header, área principal de conteúdo e footer.
 * 
 * @author Edison Vargas Teixeira
 * @component AppLayout
 */

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ReactNode } from "react";

/**
 * Props do componente AppLayout
 */
interface AppLayoutProps {
  /** Conteúdo a ser renderizado na área principal */
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm">
            <SidebarTrigger className="hover:bg-accent/50 interactive" />
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Processamento local • Seguro
              </div>
              <div className="h-2 w-2 rounded-full bg-success animate-glow-pulse"></div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground bg-card/30">
            <p>
              © 2025 Edison Vargas Teixeira - EncodLab Studio. 
              <span className="ml-2">
                Ferramenta de código aberto para desenvolvedores.
              </span>
            </p>
          </footer>
        </div>
        
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
}