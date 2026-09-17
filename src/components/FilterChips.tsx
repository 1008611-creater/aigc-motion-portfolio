type Props<T extends string> = {
  items: readonly T[];
  value: T;
  onChange: (next: T) => void;
  ariaLabel: string;
};

// 精选区与作品库共用同一套筛选交互，抽出来保证两边视觉与可访问性一致。
export function FilterChips<T extends string>({ items, value, onChange, ariaLabel }: Props<T>) {
  return (
    <div className="filters" role="group" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={item === value ? "chip is-active" : "chip"}
          aria-pressed={item === value}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
