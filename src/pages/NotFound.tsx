import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[50vh] flex items-center justify-center">
        <Card className="max-w-md w-full glow-card text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
            <p className="text-lg text-muted-foreground">Oops! Página não encontrada</p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <a href="/">
                Voltar ao Início
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NotFound;
