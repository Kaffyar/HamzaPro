type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

export function addMediaQueryChangeListener(
  mediaQuery: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) {
  const legacyMediaQuery = mediaQuery as LegacyMediaQueryList;
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener);
    return;
  }
  if (typeof legacyMediaQuery.addListener === "function") {
    legacyMediaQuery.addListener(listener);
  }
}

export function removeMediaQueryChangeListener(
  mediaQuery: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) {
  const legacyMediaQuery = mediaQuery as LegacyMediaQueryList;
  if (typeof mediaQuery.removeEventListener === "function") {
    mediaQuery.removeEventListener("change", listener);
    return;
  }
  if (typeof legacyMediaQuery.removeListener === "function") {
    legacyMediaQuery.removeListener(listener);
  }
}
