export const ENABLE_HEAVY_MOTION = true;
export const INTRO_DURATION_MS = 1550;
export const LENIS_ENABLED = true;
export const CURSOR_ENABLED = true;
export const CINEMATIC_MODE = true;
export const HERO_PARALLAX_INTENSITY = 1.0;
export const MOBILE_MOTION_MULTIPLIER = 0.55;
export const SECTION_STAGGER_MS = 90;
export const FILM_GRAIN_ENABLED = true;

export function isLowPowerHeuristic(): boolean {
  if (typeof navigator === "undefined") return false;

  const cpuLow = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const memoryLow =
    "deviceMemory" in navigator &&
    typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number" &&
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

  return cpuLow || memoryLow;
}
