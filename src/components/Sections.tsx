import { useState } from "react";
import { capabilities, education, profile, projects, services, steps, works } from "../data/portfolio";
import type { Work } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import { WorkCard } from "./WorkCard";

const FILTERS = ["全部", "产品广告", "门店内容", "人物种草", "食品视觉", "场景视觉"] as const;

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="head__title">{title}</h2>
      {copy ? <p className="head__copy">{copy}</p> : null}
    </div>
  );
}

export function WorkSection({ onOpen }: { onOpen: (work: Work) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("全部");
  const ref = useReveal<HTMLDivElement>();

  const visible = filter === "全部" ? works : works.filter((work) => work.category === filter);

  return (
    <section className="section" id="work">
      <SectionHead
        eyebrow="Selected Work"
        title="11 条精选样片，按用途归类"
        copy="每条都标了真实时长与交付比例，方便先判断质量与适配场景，再决定怎么合作。"
      />

      <div className="filters" role="group" aria-label="按用途筛选">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={item === filter ? "chip is-active" : "chip"}
            aria-pressed={item === filter}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid" ref={ref} data-reveal="hidden">
        {visible.map((work) => (
          <WorkCard key={work.id} work={work} onOpen={onOpen} />
        ))}
      </div>

      {visible.length === 0 ? <p className="empty">这个分类下暂时没有样片。</p> : null}
    </section>
  );
}

export function ProjectSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section section--alt" id="projects">
      <SectionHead
        eyebrow="Case Studies"
        title="四条项目线，对应四种推进方式"
        copy="从生成式内容交付到 3D 交互、复杂业务收束与量产落地，每条都给出可核对的证据。"
      />
      <div className="projects" ref={ref} data-reveal="hidden">
        {projects.map((project) => (
          <article className="project" key={project.index}>
            <div className="project__head">
              <span className="project__index">{project.index}</span>
              <p className="project__kind">{project.kind}</p>
            </div>
            <h3 className="project__title">{project.title}</h3>
            <p className="project__copy">{project.copy}</p>
            <ul className="project__points">
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ul className="project__tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="services">
      <SectionHead
        eyebrow="Services"
        title="可以承接的内容方向"
        copy="先看要样片还是先判断方案，再决定试单、批量素材还是精品定制。"
      />
      <div className="services" ref={ref} data-reveal="hidden">
        {services.map((service, index) => (
          <article className="service" key={service.title}>
            <span className="service__index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </article>
        ))}
      </div>

      <ol className="steps">
        {steps.map((step) => (
          <li key={step.index}>
            <span className="steps__index">{step.index}</span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CapabilitySection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section section--alt" id="capability">
      <SectionHead
        eyebrow="Capability"
        title="四条能力，都能回到具体项目"
        copy="不做抽象标签，每条能力都在前面的案例里能找到对应证据。"
      />
      <div className="capabilities" ref={ref} data-reveal="hidden">
        {capabilities.map((item) => (
          <article className="capability" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="edu">
        <div className="edu__main">
          <p className="eyebrow">Education</p>
          <h3>
            {education.school}
            <span>{education.major}</span>
          </h3>
          <p>{education.note}</p>
        </div>
        <div className="edu__side">
          <p className="edu__period">{education.period}</p>
          <ul className="edu__courses">
            {education.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const ref = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);

  const copyContact = async () => {
    const text = profile.name + " | " + profile.phone + " | " + profile.email;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section section--contact" id="contact" ref={ref} data-reveal="hidden">
      <SectionHead
        eyebrow="Contact"
        title="需要正式简历或项目材料，可以直接联系"
        copy="岗位匹配、到岗安排、项目细节与补充材料，都可以先通过电话或邮件沟通。"
      />

      <div className="contact">
        <a className="contact__item" href={"tel:" + profile.phone}>
          <span className="contact__label">电话</span>
          <strong>{profile.phone}</strong>
          <span className="contact__note">适合快速确认项目重点与到岗安排</span>
        </a>
        <a className="contact__item" href={"mailto:" + profile.email}>
          <span className="contact__label">邮箱</span>
          <strong>{profile.email}</strong>
          <span className="contact__note">适合接收岗位信息与补充材料</span>
        </a>
        <a className="contact__item" href={profile.github} target="_blank" rel="noreferrer noopener">
          <span className="contact__label">GitHub</span>
          <strong>1008611-creater</strong>
          <span className="contact__note">查看工程与交付记录</span>
        </a>
      </div>

      <div className="contact__actions">
        <button className="btn btn--primary" type="button" onClick={copyContact}>
          {copied ? "已复制联系方式" : "一键复制联系方式"}
        </button>
        <a className="btn btn--ghost" href={"mailto:" + profile.email}>
          发送邮件
        </a>
      </div>
      <p className="contact__hint">{profile.location} · {profile.education}</p>
    </section>
  );
}
