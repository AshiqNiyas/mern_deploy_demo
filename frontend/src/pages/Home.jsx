import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotes,
} from "../redux/noteSlice.js";

import NoteForm from "../components/NoteForm.jsx";

import NoteCard from "../components/NoteCard.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const {
    notes,
    loading,
    error,
  } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <main className="container">
      <section className="hero">
        <h1>
          My Notes
        </h1>

        <p>
          Create and manage your notes.
        </p>
      </section>

      <NoteForm />

      <section className="notes-section">
        <h2>
          All Notes
        </h2>

        {loading && (
          <p>Loading notes...</p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {!loading &&
          notes.length === 0 && (
            <p>
              No notes available.
            </p>
          )}

        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;