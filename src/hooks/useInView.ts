"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Is the element on screen? Used to pause diagram animation off screen and to reveal sections once.
 * `once` keeps the first true value. Defaults to true so server output is never hidden.
 */
export function useInView<T extends HTMLElement>(opts: { rootMargin?: string; once?: boolean; initial?: boolean } = {}): [React.RefObject<T | null>, boolean] {
  const { rootMargin = "120px 0px", once = false, initial = true } = opts;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);
  return [ref, inView];
}
