import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getClasses = createAsyncThunk("classes/getClasses", async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_PROTOCOL +
      process.env.REACT_APP_BACKEND_IP +
      ":" +
      process.env.REACT_APP_BACKEND_PORT +
      "/class"
  );

  return data;
});

export const getClassesByIdGroup = createAsyncThunk(
  "classes/getClassesByIdGroup",
  async (idGroup) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/class/findByIdGroup/" +
        idGroup
    );

    return data;
  }
);

export const getClassesByIdGroupAndIdProf = createAsyncThunk(
  "classes/getClassesByIdGroupAndIdProf",
  async (obj) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/class/findByIdGroupAndOwner/" +
        obj.idGroup +
        "/" +
        obj.idProf
    );

    return data;
  }
);

export const UpdateListStudents = createAsyncThunk(
  "classes/UpdateListStudents",
  async (obj) => {
    console.log(obj);
    const { data } = await axios.put(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/class/updateStudents/" +
        obj.classOb,
      obj
    );

    return data;
  }
);

export const DeleteStudentFromList = createAsyncThunk(
  "classes/DeleteStudentFromList",
  async (obj) => {
    console.log(obj);
    const { data } = await axios.put(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/class/deleteStudent/" +
        obj.classOb,
      obj
    );

    return data;
  }
);

export const getListStudentInClass = createAsyncThunk(
  "classes/getListStudentInClass",
  async (idClass) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/class/getListStudent/" +
        idClass
    );

    return data;
  }
);

export const getClassesForStudents = createAsyncThunk(
  "classes/getClassesForStudents",
  async (idUser) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_PROTOCOL +
        process.env.REACT_APP_BACKEND_IP +
        ":" +
        process.env.REACT_APP_BACKEND_PORT +
        "/invitation/listAcceptedByUser/" +
        idUser
    );

    return data;
  }
);

export const Addclasses = createAsyncThunk(
  "classes/Addclasses",
  async (classes) => {
    const promise = await axios
      .post(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/class/",
        classes
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

export const GetClaseesById = createAsyncThunk(
  "class/GetClaseesById",
  async (Id) => {
    const promise = await axios
      .get(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/class/" +
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

export const Editclasses = createAsyncThunk(
  "classes/Editclasses",
  async (classes) => {
    //console.log(seanceId);

    const promise = await axios
      .put(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/class/" +
          classes._id,
        classes
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

export const Deleteclasses = createAsyncThunk(
  "classes/Deleteclasses",

  async (Id) => {
    const promise = await axios
      .delete(
        process.env.REACT_APP_BACKEND_PROTOCOL +
          process.env.REACT_APP_BACKEND_IP +
          ":" +
          process.env.REACT_APP_BACKEND_PORT +
          "/class/" +
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

export const StockURLClass = createAsyncThunk(
  "classes/StockURLClass",

  async (Id) => {
    return Id;
  }
);

export const classesSlice = createSlice({
  name: "classes",
  initialState: {
    list: [],
    status: null,
    classById: null,
    classByGroup: [],
    classURL: null,
    listStudents: [],
  },
  extraReducers: {
    [getClasses.pending]: (state, action) => {
      state.status = "loading";
    },
    [getClasses.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getClasses.rejected]: (state, action) => {
      state.status = "failed";
    },
    [Addclasses.fulfilled]: (state, action) => {
      state.list.push(action.payload.result);
    },
    [StockURLClass.fulfilled]: (state, action) => {
      state.classURL = action.payload;
    },
    [Deleteclasses.fulfilled]: (state, action) => {
      state.list = state.list.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [GetClaseesById.fulfilled]: (state, action) => {
      state.classById = action.payload;
    },
    [getClassesForStudents.fulfilled]: (state, action) => {
      state.classByGroup = action.payload;
    },
    [getClassesByIdGroup.fulfilled]: (state, action) => {
      state.classByGroup = action.payload;
    },
    [getClassesByIdGroupAndIdProf.fulfilled]: (state, action) => {
      state.classByGroup = action.payload;
    },

    [UpdateListStudents.fulfilled]: (state, action) => {
      state.status = "list students updated";
    },
    [DeleteStudentFromList.fulfilled]: (state, action) => {
      state.status = "Student deleted from List";
    },
    [getListStudentInClass.fulfilled]: (state, action) => {
      state.listStudents = action.payload;
    },

    [Editclasses.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      let classe = action.payload.result;
      let classes = state.list.slice();
      for (let i = 0, n = classes.length; i < n; i++) {
        if (classes[i]._id === classe._id) {
          classes[i].idProf = classe.idProf;
          classes[i].name = classe.name;
          classes[i].section = classe.section;

          break; // Stop this loop, we found it!
        }
      }
      state.list = classes;
    },
  },
});

export default classesSlice.reducer;
