import { useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FullscreenModalProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  className?: string;
}

export function FullscreenModal({ 
  children, 
  trigger, 
  title = "Visualização em Tela Cheia",
  className 
}: FullscreenModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultTrigger = (
    <Button variant="outline" size="icon" className="interactive">
      <Maximize2 className="h-4 w-4" />
    </Button>
  );

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger || defaultTrigger}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={cn(
            "max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] p-0 border-0 rounded-none",
            "bg-background/95 backdrop-blur-sm",
            className
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
              <div className="flex items-center gap-3">
                <Minimize2 className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {children}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}