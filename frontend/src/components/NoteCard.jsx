import { useDispatch } from "react-redux";

import {
  deleteNote,
  toggleNote,
} from "../redux/noteSlice.js";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <div className="note-card">
      <div>
        <h3
          className={
            note.completed
              ? "completed"
              : ""
          }
        >
          {note.title}
        </h3>

        <p>{note.content}</p>
      </div>

      <div className="note-actions">
        <button
          onClick={() =>
            dispatch(
              toggleNote(note._id)
            )
          }
        >
          {note.completed
            ? "Mark Pending"
            : "Complete"}
        </button>

        <button
          onClick={() =>
            dispatch(
              deleteNote(note._id)
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;