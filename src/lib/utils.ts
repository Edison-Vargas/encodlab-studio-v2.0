/**
 * EncodLab Studio - Utilitários gerais
 * 
 * Funções auxiliares para manipulação de classes CSS e outras utilidades comuns.
 * 
 * @author Edison Vargas Teixeira
 * @module utils
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina classes CSS de forma inteligente, mesclando classes do Tailwind
 * e removendo conflitos automatiamente.
 * 
 * @param inputs - Lista de valores de classe CSS
 * @returns String com as classes combinadas e otimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
