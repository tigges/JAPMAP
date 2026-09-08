import type { PracticalItem } from "../data/dayDetails";

export default function DayPractical({ items }: { items: PracticalItem[] }) {
  return (
    <aside className="day-practical">
      <h2>The day, practically</h2>
      <ol>
        {items.map((item) => (
          <li key={`${item.value}-${item.title}`}>
            <b>{item.value}</b>
            <div>
              <strong>{item.title}</strong>
              {item.note ? <span>{item.note}</span> : null}
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
