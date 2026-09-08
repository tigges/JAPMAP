import { fmtEffort, fmtInt, fmtKm } from "../data/format";
import { effortOf, type RideDay } from "../data/ride";
import type { DayDetail } from "../data/dayDetails";

type Props = {
  day: RideDay;
  detail: DayDetail;
};

export default function DayStats({ day, detail }: Props) {
  const hardest = detail.hardestKm;
  const cells = [
    { value: fmtKm(day.km), label: "km today" },
    { value: fmtInt(day.climbM), label: "m of climbing" },
    {
      value: detail.highPointM != null ? fmtInt(detail.highPointM) : "—",
      label: "m high point",
    },
    { value: fmtEffort(effortOf(day)), label: "effort" },
    { value: hardest ? `+${hardest.gainM}` : "—", label: "m hardest km" },
    { value: hardest ? fmtKm(hardest.atKm) : "—", label: "km at its start" },
  ];

  return (
    <dl className="day-stats" aria-label="Day figures">
      {cells.map((c) => (
        <div key={c.label}>
          <dd>{c.value}</dd>
          <dt>{c.label}</dt>
        </div>
      ))}
    </dl>
  );
}
