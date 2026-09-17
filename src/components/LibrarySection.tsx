import { useState } from "react";
import { libraryWorks } from "../data/library";
import type { Work } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import { FilterChips } from "./FilterChips";
import { SectionHead } from "./SectionHead";
import { WorkCard } from "./WorkCard";

const FILTERS = ["全部", "横屏", "竖屏"] as const;

// 首屏只渲染 12 条：31 张封面同时进入视口会拖慢首屏，展开按钮按需补齐。
const PAGE = 12;

export function LibrarySection({ onOpen }: { onOpen: (work: Work) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("全部");
  const [expanded, setExpanded] = useState(false);
  const ref = useReveal<HTMLDivElement>();

  const filtered =
    filter === "全部" ? libraryWorks : libraryWorks.filter((work) => work.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, PAGE);
  const hidden = filtered.length - visible.length;

  const changeFilter = (next: (typeof FILTERS)[number]) => {
    setFilter(next);
    setExpanded(false);
  };

  return (
    <section className="section" id="library">
      <SectionHead
        eyebrow="Full Archive"
        title="31 条真实样片全量归档"
        copy="与上方精选同一批交付，按横竖屏归档，每条标注实测分辨率与时长，可直接点击播放。"
      />

      <FilterChips
        items={FILTERS}
        value={filter}
        onChange={changeFilter}
        ariaLabel="按画面比例筛选"
      />

      <div className="grid" ref={ref} data-reveal="hidden">
        {visible.map((work) => (
          <WorkCard key={work.id} work={work} onOpen={onOpen} />
        ))}
      </div>

      {hidden > 0 ? (
        <div className="library__more">
          <button className="btn btn--ghost" type="button" onClick={() => setExpanded(true)}>
            展开全部 {filtered.length} 条
          </button>
        </div>
      ) : null}

      {expanded && filtered.length > PAGE ? (
        <div className="library__more">
          <button className="btn btn--ghost" type="button" onClick={() => setExpanded(false)}>
            收起作品库
          </button>
        </div>
      ) : null}
    </section>
  );
}
