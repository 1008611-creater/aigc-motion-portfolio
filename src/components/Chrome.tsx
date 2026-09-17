import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const NAV_ITEMS = [
  { id: "work", label: "作品" },
  { id: "projects", label: "项目" },
  { id: "capability", label: "能力" },
  { id: "contact", label: "联系" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div className="progress" style={{ scaleX: width }} aria-hidden="true" />
  );
}

// 鼠标跟随光斑用 CSS 变量而不是逐帧 setState，避免滚动时掉帧。
export function CursorField() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!query.matches || reduced.matches) return;

    setFine(true);
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      frame = 0;
      document.documentElement.style.setProperty("--mx", nextX + "px");
      document.documentElement.style.setProperty("--my", nextY + "px");
    };

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--mx");
      document.documentElement.style.removeProperty("--my");
    };
  }, []);

  if (!fine) return null;
  return <div className="cursor-field" aria-hidden="true" />;
}

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={solid ? "nav is-solid" : "nav"}>
      <a className="nav__brand" href="#top">
        <span className="nav__mark" aria-hidden="true" />
        <span>刘曙宾</span>
      </a>
      <nav className="nav__links" aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={"#" + item.id}>
            {item.label}
          </a>
        ))}
        <a className="nav__cta" href="#contact">
          沟通合作
        </a>
      </nav>
    </header>
  );
}

export function Footer({ phone, email, github }: { phone: string; email: string; github: string }) {
  return (
    <footer className="footer">
      <div className="footer__row">
        <span>© 2026 刘曙宾 · AIGC 动效作品集</span>
        <div className="footer__links">
          <a href={"tel:" + phone}>{phone}</a>
          <a href={"mailto:" + email}>{email}</a>
          <a href={github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </div>
      </div>
      <p className="footer__note">
        页面内所有样片与项目信息均来自真实交付记录；如需正式简历或补充材料，可通过电话或邮箱索取。
      </p>
    </footer>
  );
}
