import { useEffect, useState } from "react";

/**
 * Retorna `value` com atraso de `delayMs` a cada mudança. Usado para evitar uma
 * requisição por tecla no campo de busca.
 */
export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
