import { photoUrl } from "../data/ride";
import {
  PHOTO_KIND_LABEL,
  milestonesOf,
  photoSourced,
  type DayDetail,
} from "../data/dayDetails";
import { fmtKm } from "../data/format";

export default function DayMilestones({ detail }: { detail: DayDetail }) {
  const rows = milestonesOf(detail);
  if (rows.length === 0) return null;

  return (
    <section className="milestones">
      <div className="milestones-head">
        <h2>Milestones</h2>
        <p>In kilometre order — ride the day by reading down.</p>
      </div>
      <div className="milestone-list">
        {rows.map((photo) => (
          <article key={photo.n} className="milestone">
            <div className="milestone-meta">
              <p className="milestone-km">
                {photo.atKm != null ? (
                  <>
                    {fmtKm(photo.atKm)}
                    <small>km</small>
                  </>
                ) : (
                  <small>pin {photo.n}</small>
                )}
              </p>
              <b className="milestone-num">{photo.n}</b>
              <div className="milestone-copy-wrap">
                {photo.titleJa ? <p className="milestone-ja">{photo.titleJa}</p> : null}
                <h3>{photo.title}</h3>
                <p className="milestone-kind">{PHOTO_KIND_LABEL[photo.kind]}</p>
                <p className="milestone-copy">{photo.subtitle}</p>
              </div>
            </div>
            {photoSourced(photo) && photo.file ? (
              <figure className="milestone-photo">
                <img src={photoUrl(photo.file)} alt={photo.title} width={960} height={640} />
                <figcaption>
                  Photo: {photo.artist}, {photo.license}, via{" "}
                  <a href={photo.commons} target="_blank" rel="noreferrer">
                    Wikimedia Commons
                  </a>
                </figcaption>
              </figure>
            ) : (
              <div className="milestone-ph">Photograph when we have one.</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
