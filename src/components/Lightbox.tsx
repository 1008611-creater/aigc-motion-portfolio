import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Work } from "../data/portfolio";

type Props = {
  work: Work | null;
  onClose: () => void;
};

export function Lightbox({ work, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!work) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={work.title}
          onClick={onClose}
        >
          <motion.div
            className="lightbox__panel"
            data-orientation={work.orientation}
            initial={{ y: 26, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="lightbox__close" type="button" onClick={onClose} aria-label="关闭">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <video
              ref={videoRef}
              src={work.video}
              poster={work.poster}
              controls
              autoPlay
              loop
              playsInline
            />
            <div className="lightbox__info">
              <p className="lightbox__kicker">
                {work.category} · {work.duration}
              </p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
