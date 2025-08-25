/**
 * EncodLab Studio - Ponto de entrada da aplicação
 * 
 * Laboratório técnico interativo para geração, validação e decodificação 
 * de estruturas de autenticação e codificação (JWT, Base64, URL).
 * 
 * @author Edison Vargas Teixeira
 * @version 1.0.0
 * @since 2025
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
