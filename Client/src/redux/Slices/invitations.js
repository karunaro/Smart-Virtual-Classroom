import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllStudents = createAsyncThunk(
  "invitations/getAllStudents",
  async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/users/allstudent"
    );

    return data;
  }
);

export const getListStudentsByClass = createAsyncThunk(
  "invitations/getListStudentsByClass",
  async (classId) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation/listAcceptedByClass/" +
        classId
    );

    return data;
  }
);

export const InacceptedClass = createAsyncThunk(
  "invitations/InacceptedClass",
  async (userId) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation/listInaccepted/" +
        userId
    );

    return data;
  }
);

export const AcceptInvitation = createAsyncThunk(
  "invitations/AcceptInvitation",
  async (obj) => {
    const { data } = await axios.put(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation",
      obj
    );

    return data;
  }
);

export const RefuseInvitation = createAsyncThunk(
  "invitations/RefuseInvitation",
  async (obj) => {
    const { data } = await axios.delete(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation/" +
        obj.classOb +
        "/" +
        obj.userOb
    );

    return data;
  }
);

export const sendInvitations = createAsyncThunk(
  "invitations/sendInvitations",
  async (obj) => {
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation",
      obj
    );

    return data;
  }
);

export const InvitationsSlice = createSlice({
  name: "invitations",
  initialState: {
    listStudents: [],
    listStudentsByClass: [],
    listClassInaccepted: [],
    status: null,
  },
  extraReducers: {
    [getAllStudents.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllStudents.fulfilled]: (state, { payload }) => {
      state.listStudents = payload;
      state.status = "success";
    },
    [getAllStudents.rejected]: (state, action) => {
      state.status = "failed";
    },
    [sendInvitations.fulfilled]: (state, action) => {
      state.status = "Invitation Send";
    },
    [getListStudentsByClass.fulfilled]: (state, action) => {
      state.listStudentsByClass = action.payload;
    },
    [InacceptedClass.fulfilled]: (state, action) => {
      state.listClassInaccepted = action.payload;
    },
    [AcceptInvitation.fulfilled]: (state, action) => {
      state.status = "invitation accepted";
    },
    [RefuseInvitation.fulfilled]: (state, action) => {
      state.status = "invitation refused";
    },
  },
});

export default InvitationsSlice.reducer;
