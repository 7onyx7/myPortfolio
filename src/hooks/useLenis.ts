import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export { LenisContext };
