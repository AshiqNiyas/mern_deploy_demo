import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import API from "../services/api.js";

// GET NOTES
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/notes");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch notes"
      );
    }
  }
);

// CREATE NOTE
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      const response = await API.post(
        "/notes",
        noteData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create note"
      );
    }
  }
);

// UPDATE NOTE
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.put(
        `/notes/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update note"
      );
    }
  }
);

// DELETE NOTE
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/notes/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete note"
      );
    }
  }
);

// TOGGLE NOTE
export const toggleNote = createAsyncThunk(
  "notes/toggleNote",
  async (id, thunkAPI) => {
    try {
      const response = await API.patch(
        `/notes/${id}/toggle`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update note"
      );
    }
  }
);

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(
        fetchNotes.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchNotes.fulfilled,
        (state, action) => {
          state.loading = false;
          state.notes = action.payload;
        }
      )

      .addCase(
        fetchNotes.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // CREATE
      .addCase(
        createNote.fulfilled,
        (state, action) => {
          state.notes.unshift(action.payload);
        }
      )

      // UPDATE
      .addCase(
        updateNote.fulfilled,
        (state, action) => {
          const index = state.notes.findIndex(
            (note) =>
              note._id === action.payload._id
          );

          if (index !== -1) {
            state.notes[index] =
              action.payload;
          }
        }
      )

      // DELETE
      .addCase(
        deleteNote.fulfilled,
        (state, action) => {
          state.notes = state.notes.filter(
            (note) =>
              note._id !== action.payload
          );
        }
      )

      // TOGGLE
      .addCase(
        toggleNote.fulfilled,
        (state, action) => {
          const index = state.notes.findIndex(
            (note) =>
              note._id === action.payload._id
          );

          if (index !== -1) {
            state.notes[index] =
              action.payload;
          }
        }
      );
  },
});

export default noteSlice.reducer;