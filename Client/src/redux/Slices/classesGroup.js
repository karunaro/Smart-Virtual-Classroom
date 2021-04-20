import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getclassesGroup = createAsyncThunk(
  "classesGroup/getclassesGroup",
  async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/classesGroup"
    );

    return data;
  }
);

export const getclassesGroupForProfessor = createAsyncThunk(
  "classesGroup/getclassesGroupForProfessor",
  async (id) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/classesGroup/professor/" +
        id
    );

    return data;
  }
);

export const getAllProfessors = createAsyncThunk(
  "classesGroup/getAllProfessors",
  async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/users/allprofessor"
    );

    return data;
  }
);

export const AddclassesGroup = createAsyncThunk(
  "classesGroup/AddclassesGroup",
  async (classesGroup) => {
    const promise = await axios
      .post(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/classesGroup/",
        classesGroup
      )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const GetclassesGroupById = createAsyncThunk(
  "classesGroup/GetclassesGroupById",
  async (Id) => {
    const promise = await axios
      .get(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/classesGroup/" +
          Id
      )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const EditclassesGroup = createAsyncThunk(
  "classesGroup/EditclassesGroup",
  async (classesGroup) => {
    //console.log(seanceId);

    const promise = await axios
      .put(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/classesGroup/" +
          classesGroup._id,
        classesGroup
      )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const DeleteclassesGroup = createAsyncThunk(
  "classesGroup/DeleteclassesGroup",

  async (Id) => {
    const promise = await axios
      .delete(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/classesGroup/" +
          Id
      )

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const StockURL = createAsyncThunk(
  "classesGroup/StockURL",

  async (Id) => {
    return Id;
  }
);

export const classesGroupSlice = createSlice({
  name: "classesGroup",
  initialState: {
    list: [],
    status: null,
    classesGroupById: null,
    classeGroupURL: null,
    listProfessors: null,
  },
  extraReducers: {
    [getclassesGroup.pending]: (state, action) => {
      state.status = "loading";
    },
    [getclassesGroup.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getclassesGroup.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getclassesGroupForProfessor.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getAllProfessors.fulfilled]: (state, { payload }) => {
      state.listProfessors = payload;
    },
    [AddclassesGroup.fulfilled]: (state, action) => {
      state.list.push(action.payload.result);
    },
    [DeleteclassesGroup.fulfilled]: (state, action) => {
      state.list = state.list.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [GetclassesGroupById.fulfilled]: (state, action) => {
      state.classesGroupById = action.payload;
    },
    [StockURL.fulfilled]: (state, action) => {
      state.classeGroupURL = action.payload;
    },

    [EditclassesGroup.fulfilled]: (state, action) => {
      let classeGroup = action.payload.result;
      let classesGroup = state.list.slice();
      for (let i = 0, n = classesGroup.length; i < n; i++) {
        if (classesGroup[i]._id === classeGroup._id) {
          classesGroup[i].name = classeGroup.name;

          break; // Stop this loop, we found it!
        }
      }
      state.list = classesGroup;
    },
  },
});

export default classesGroupSlice.reducer;
