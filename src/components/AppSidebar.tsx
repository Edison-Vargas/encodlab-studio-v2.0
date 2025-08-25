/**
 * EncodLab Studio - Componente Sidebar da aplicação
 * 
 * Sidebar responsivo com navegação organizada por categorias:
 * - Ferramentas JWT (encoder, decoder, validator, generator)
 * - Ferramentas Base64 (encoder, decoder)
 * - Ferramentas URL (encoder, decoder)
 * - Recursos (documentação, sobre)
 * 
 * @author Edison Vargas Teixeira
 * @component AppSidebar
 */

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Key,
  Shield,
  Code,
  Zap,
  Settings,
  FileText,
  Lock,
  Unlock,
  Binary,
  FileCode,
  Info
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const jwtItems = [
  { title: "JWT Decoder", url: "/", icon: Unlock, description: "Decodificar JWT" },
  { title: "JWT Encoder", url: "/encoder", icon: Lock, description: "Codificar JWT" },
  { title: "JWT Validator", url: "/validator", icon: Shield, description: "Validar assinatura" },
  { title: "JWT Generator", url: "/generator", icon: Zap, description: "Gerar tokens" },
];

const base64Items = [
  { title: "Base64 Encoder", url: "/base64-encoder", icon: Binary, description: "Codificar Base64" },
  { title: "Base64 Decoder", url: "/base64-decoder", icon: FileCode, description: "Decodificar Base64" },
];

const toolItems = [
  { title: "Documentação", url: "/docs", icon: FileText, description: "Guia completo" },
  { title: "Sobre o Projeto", url: "/about", icon: Info, description: "História e motivações" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium glow-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground interactive";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-72"} border-r border-sidebar-border bg-sidebar`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary glow-primary">
            <Key className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EncodLab Studio
              </h2>
              <p className="text-xs text-sidebar-foreground/60">by Edison Vargas</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            {!isCollapsed && "Ferramentas JWT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {jwtItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            {!isCollapsed && "Ferramentas Base64"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {base64Items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            {!isCollapsed && "Recursos"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-8 p-4 rounded-lg bg-gradient-secondary border border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Seguro & Local</span>
            </div>
            <p className="text-xs text-sidebar-foreground/70">
              Todos os tokens são processados localmente no seu navegador. 
              Nenhum dado é enviado para servidores externos.
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}