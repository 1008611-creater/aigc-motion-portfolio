import { useRef, useState } from "react";
import type { Work } from "../data/portfolio";

type Props = {
  work: Work;
  onOpen: (work: Work) => void;
};

// 悬停时才挂载 video：11 条片子在列表里同时加载会直接拖垮首屏。
export function WorkCard({ work, onOpen }: Props) {
  const [preview, setPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startPreview = () => {
    setPreview(true);
    const node = videoRef.current;
    if (!node) return;
    node.play().catch(() => {
      // 浏览器拦截自动播放时保留海报，不影响主流程。
    });
  };

  return (
    <article
      className="card"
      data-orientation={work.orientation}
      onMouseEnter={startPreview}
      onMouseLeave={() => setPreview(false)}
    >
      <button className="card__hit" type="button" onClick={() => onOpen(work)} aria-label={"播放：" + work.title}>
        <span className="card__frame">
          <img src={work.poster} alt={work.title + " 封面"} loading="lazy" decoding="async" />
          {preview ? (
            <video
              ref={videoRef}
              src={work.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          ) : null}
          <span className="card__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="card__meta">
            <span>{work.category}</span>
            <span>{work.duration}</span>
          </span>
        </span>
        <span className="card__body">
          <span className="card__index">{work.index}</span>
          <span className="card__title">{work.title}</span>
          <span className="card__summary">{work.summary}</span>
        </span>
      </button>
    </article>
  );
}
