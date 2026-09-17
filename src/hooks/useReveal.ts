import { useEffect, useRef } from "react";

// 只加一次 observer：滚动揭示是全局节奏，避免每个组件各自注册导致节奏不一致。
// 阈值固定为 0：作品网格在移动端比视口高得多，按比例触发会永远达不到，
// 整块内容会一直停在隐藏态。
export function useReveal<T extends HTMLElement>(options?: { once?: boolean }) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.dataset.reveal = "visible";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            if (options?.once !== false) observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -14% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.once]);

  return ref;
}
