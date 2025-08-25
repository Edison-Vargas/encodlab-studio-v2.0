/**
 * EncodLab Studio - Hook para funcionalidade drag & drop
 * 
 * Hook personalizado que implementa funcionalidade de arrastar e soltar
 * para arquivos e texto, com validação de tipos de arquivo.
 * 
 * @author Edison Vargas Teixeira
 * @hook useDragDrop
 */

import { useState, useCallback, DragEvent } from "react";

/**
 * Props do hook useDragDrop
 */
interface UseDragDropProps {
  /** Callback executado quando um arquivo é solto */
  onFileDrop: (file: File) => void;
  /** Callback opcional para quando texto é solto */
  onTextDrop?: (text: string) => void;
  /** Tipos MIME aceitos para validação */
  acceptedTypes?: string[];
}

export function useDragDrop({ onFileDrop, onTextDrop, acceptedTypes }: UseDragDropProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set to false if we're leaving the main container
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const text = e.dataTransfer.getData('text/plain');

    if (files.length > 0) {
      const file = files[0];
      
      // Check if file type is accepted
      if (acceptedTypes && acceptedTypes.length > 0) {
        const isAccepted = acceptedTypes.some(type => {
          if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return file.type.startsWith(category + '/');
          }
          return file.type === type;
        });
        
        if (!isAccepted) {
          console.warn('File type not accepted:', file.type);
          return;
        }
      }
      
      onFileDrop(file);
    } else if (text && onTextDrop) {
      onTextDrop(text);
    }
  }, [onFileDrop, onTextDrop, acceptedTypes]);

  const dragProps = {
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  return {
    isDragOver,
    dragProps,
  };
}