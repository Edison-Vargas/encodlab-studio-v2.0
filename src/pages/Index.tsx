/**
 * EncodLab Studio - Página inicial
 * 
 * Página principal da aplicação que apresenta o decodificador JWT
 * e um guia de início rápido para novos usuários.
 * 
 * @author Edison Vargas Teixeira
 * @page Index
 */

import { AppLayout } from "@/components/layout/AppLayout";
import { JWTDecoder } from "@/components/jwt/JWTDecoder";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Quick Start Guide */}
        <Card className="glow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Primeira vez aqui?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Confira nossa documentação completa para aprender a usar todas as ferramentas disponíveis
            </p>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link to="/docs" className="flex items-center gap-2">
                Ver Documentação
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <JWTDecoder />
      </div>
    </AppLayout>
  );
};

export default Index;
