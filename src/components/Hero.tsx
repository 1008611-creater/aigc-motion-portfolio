import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { heroStats, marqueeWords, profile, works } from "../data/portfolio";

const heroWork = works.find((item) => item.id === "case-03") ?? works[0];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-18%"]);
  const veil = useTransform(scrollYProgress, [0, 0.9], [0.34, 0.86]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY }} aria-hidden="true">
        <video
          src={heroWork.video}
          poster={heroWork.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <motion.span className="hero__veil" style={{ opacity: veil }} />
      </motion.div>

      <motion.div className="hero__copy" style={{ y: copyY }}>
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          {profile.role}
        </p>
        <h1 className="hero__title">
          {profile.name}
          <span className="hero__title-latin">{profile.latin}</span>
        </h1>
        <p className="hero__headline">{profile.headline}</p>
        <p className="hero__intro">{profile.intro}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            看代表作品
            <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href="#contact">
            索取正式简历
          </a>
        </div>

        <dl className="hero__stats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <dt>{stat.label}</dt>
              <dd>
                {stat.value}
                <small>{stat.note}</small>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((pass) => (
            <div className="marquee__group" key={pass}>
              {marqueeWords.map((word) => (
                <span key={pass + word}>{word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a className="hero__scroll" href="#work">
        <span aria-hidden="true" />
        向下浏览
      </a>
    </section>
  );
}
