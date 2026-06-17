// ─────────────────────────────────────────────
//  components/JobCard.jsx
// ─────────────────────────────────────────────

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectIsFavorite } from "../store/favoritesSlice";
import Badge from "./Badge";

export default function JobCard({ job, onEdit, onDelete }) {
  const dispatch   = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(job.id));

  function handleFavoriteToggle() {
    if (isFavorite) {
      dispatch(removeFavorite(job.id));
    } else {
      dispatch(addFavorite(job));
    }
  }

  return (
    <div className="job-card">

      {/* Top row */}
      <div className="job-card__header">
        <div>
          <div className="job-card__company">{job.company}</div>
          <div className="job-card__role">{job.role}</div>
        </div>

        <div className="job-card__badges">
          <Badge status={job.status} />
          <button
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`job-card__fav-btn ${isFavorite ? "job-card__fav-btn--active" : ""}`}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="job-card__meta">
        {job.location && <span>{job.location}</span>}
        {job.dateApplied && <span>{job.dateApplied}</span>}
      </div>

      {/* Notes */}
      {job.notes && (
        <div className="job-card__notes">{job.notes}</div>
      )}

      {/* Job link */}
      {job.jobLink && (
        <a href={job.jobLink} target="_blank" rel="noreferrer" className="job-card__link">
          Website applied
        </a>
      )}

      {/* Actions */}
      <div className="job-card__actions">
        <button className="job-card__btn job-card__btn--edit" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="job-card__btn job-card__btn--delete" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}