import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSectionsByClass = createAsyncThunk(
  "sections/getSectionsByClass",
  async (classId) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/section/class/" +
        classId
    );

    return data;
  }
);

export const getSectionsById = createAsyncThunk(
  "sections/getSectionsById",
  async (id) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/section/" +
        id
    );

    return data;
  }
);

export const AddSection = createAsyncThunk(
  "sections/AddSection",
  async (section) => {
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/section",
      section
    );

    return data;
  }
);

export const EditSection = createAsyncThunk(
  "sections/EditSection",
  async (section) => {
    const { data } = await axios.put(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/section/" +
        section._id,
      section
    );

    return data;
  }
);

export const DeleteSection = createAsyncThunk(
  "sections/DeleteSection",
  async (id) => {
    const { data } = await axios.delete(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/section/" +
        id
    );

    return data;
  }
);

export const SectionsSlice = createSlice({
  name: "sections",
  initialState: {
    listSections: [],
    listSectionsByClass: [],
    sectionById: null,
    status: null,
  },
  extraReducers: {
    [getSectionsByClass.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSectionsByClass.fulfilled]: (state, { payload }) => {
      state.listSectionsByClass = payload;
      state.status = "success";
    },
    [getSectionsByClass.rejected]: (state, action) => {
      state.status = "failed";
    },
    [AddSection.fulfilled]: (state, { payload }) => {
      state.listSectionsByClass.push(payload.result);
    },
    [getSectionsById.fulfilled]: (state, { payload }) => {
      state.sectionById = payload;
    },
    [DeleteSection.fulfilled]: (state, { payload }) => {
      state.listSectionsByClass = state.listSectionsByClass.filter((u) => {
        return u._id !== payload.result._id;
      });
    },
    [EditSection.fulfilled]: (state, { payload }) => {
      state.statusUpdate = "success";
      let section = payload.result;
      let sections = state.listSectionsByClass.slice();
      for (let i = 0, n = sections.length; i < n; i++) {
        if (sections[i]._id === section._id) {
          sections[i].idProf = section.idProf;
          sections[i].name = section.name;
          sections[i].section = section.idGroup;

          break; // Stop this loop, we found it!
        }
      }
      state.listSectionsByClass = sections;
    },
  },
});

export default SectionsSlice.reducer;
