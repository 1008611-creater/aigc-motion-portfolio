import { useState } from "react";
import { libraryWorks } from "../data/library";
import type { Work } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import { FilterChips } from "./FilterChips";
import { SectionHead } from "./SectionHead";
import { WorkCard } from "./WorkCard";

// 作品库的主维度是「层级」，不是横竖屏：
// 横竖屏只是排版差异，成片 / 素材才决定这一条能不能当案例看。
const FILTERS = ["全部", "交付成片", "场景素材"] as const;

// 场景素材一次先渲染 8 条：18 张封面同时进入视口会拖慢首屏，展开按钮按需补齐。
const STOCK_PAGE = 8;

type Filter = (typeof FILTERS)[number];

const CASES = libraryWorks.filter((work) => work.tier === "case");
const STOCK = libraryWorks.filter((work) => work.tier === "stock");

// 分组标题：先出标题与条数，说明换行到下一行，窄屏不会被挤成两列。
function GroupHead({ title, count, note }: { title: string; count: number; note: string }) {
  return (
    <div className="library__group">
      <h3 className="library__group-title">{title}</h3>
      <span className="library__group-count">{count} 条</span>
      <p className="library__group-note">{note}</p>
    </div>
  );
}

export function LibrarySection({ onOpen }: { onOpen: (work: Work) => void }) {
  const [filter, setFilter] = useState<Filter>("全部");
  const [stockExpanded, setStockExpanded] = useState(false);
  const casesRef = useReveal<HTMLDivElement>();
  const stockRef = useReveal<HTMLDivElement>();

  const showCases = filter !== "场景素材";
  const showStock = filter !== "交付成片";
  const stockVisible = stockExpanded ? STOCK : STOCK.slice(0, STOCK_PAGE);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setStockExpanded(false);
  };

  return (
    <section className="section" id="library">
      <SectionHead
        eyebrow="Full Archive"
        title="13 条交付成片 + 18 条场景素材"
        copy="作品库按用途分两层。上层是能对上具体商业用途的交付成片，回答「做过什么」；下层是可批量复用的场景与氛围素材，体现的是稳定产出能力，而不是单条作品。每条都标注实测分辨率与时长，可直接点击播放。"
      />

      <FilterChips
        items={FILTERS}
        value={filter}
        onChange={changeFilter}
        ariaLabel="按作品层级筛选"
      />

      {showCases ? (
        <>
          <GroupHead
            title="交付成片"
            count={CASES.length}
            note="按用途分类 · 能直接回答「做过什么」"
          />
          <div className="grid" ref={casesRef} data-reveal="hidden">
            {CASES.map((work) => (
              <WorkCard key={work.id} work={work} onOpen={onOpen} />
            ))}
          </div>
        </>
      ) : null}

      {showStock ? (
        <>
          <GroupHead
            title="场景与素材库"
            count={STOCK.length}
            note="国风 / 自然 / 城市景观 / 节庆民俗 / 视觉特效 / 过渡 · 可批量复用"
          />
          <div className="grid" ref={stockRef} data-reveal="hidden">
            {stockVisible.map((work) => (
              <WorkCard key={work.id} work={work} onOpen={onOpen} />
            ))}
          </div>
        </>
      ) : null}

      {showStock && STOCK.length > STOCK_PAGE ? (
        <div className="library__more">
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => setStockExpanded((prev) => !prev)}
          >
            {stockExpanded ? "收起场景素材" : `展开全部 ${STOCK.length} 条场景素材`}
          </button>
        </div>
      ) : null}
    </section>
  );
}
