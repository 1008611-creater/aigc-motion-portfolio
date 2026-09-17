type Props = {
  eyebrow: string;
  title: string;
  copy?: string;
};

// 各分区共用同一套标题结构，避免每个 section 各写一份导致字号与间距漂移。
export function SectionHead({ eyebrow, title, copy }: Props) {
  return (
    <div className="head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="head__title">{title}</h2>
      {copy ? <p className="head__copy">{copy}</p> : null}
    </div>
  );
}
