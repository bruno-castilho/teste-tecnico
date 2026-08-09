import type { SensorMetric } from "@/lib/sensors";

/** Retorna `true` quando o valor está fora da faixa física válida do parâmetro. */
export function isOutOfRange(metric: SensorMetric, value: number): boolean {
  return value < metric.min || value > metric.max;
}

/**
 * Formata um instante ISO-8601 como tempo relativo em português
 * (ex.: "agora mesmo", "há 2 min", "há 3 h", "há 5 d").
 */
export function formatRelativeTime(
  time: string,
  now: Date = new Date(),
): string {
  const then = new Date(time);
  const diffMs = now.getTime() - then.getTime();

  if (Number.isNaN(diffMs)) return "—";
  if (diffMs < 0) return "agora mesmo";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "agora mesmo";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;

  const days = Math.floor(hours / 24);
  return `há ${days} d`;
}

/** Formata um instante ISO-8601 como data/hora local absoluta (para tooltip). */
export function formatAbsoluteTime(time: string): string {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("pt-BR");
}
