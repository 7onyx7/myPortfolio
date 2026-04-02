/**
 * useHaptics — wraps the Web Vibration API for mobile tactile feedback.
 * Silently no-ops on unsupported devices (iOS Safari, desktop).
 */
export function useHaptics() {
  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return {
    /** 10 ms — nav links, icon taps */
    light: () => vibrate(10),
    /** 25 ms — primary CTA buttons */
    medium: () => vibrate(25),
    /** double-pulse — filter/tab selection */
    selection: () => vibrate([8, 60, 8]),
    /** short-long — menu open/close toggle */
    toggle: () => vibrate([5, 40, 12]),
  };
}
