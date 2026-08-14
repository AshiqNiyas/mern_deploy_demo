import { useState } from "react";

import { useDispatch } from "react-redux";

import { createNote } from "../redux/noteSlice.js";

const NoteForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    dispatch(
      createNote({
        title,
        content,
      })
    );

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="note-form"
    >
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button type="submit">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;