import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Addclasses,
  GetClaseesById,
  getClasses,
  getClassesByIdGroup,
} from "../../redux/Slices/classes";
import {
  getAllProfessors,
  getclassesGroup,
} from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { AddSection } from "../../redux/Slices/sections";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

function AddSectionForm() {
  const classes = useStyles();
  const classess = useSelector((state) => state.classes.list);
  const userConnected = JSON.parse(localStorage.getItem("user"));
  const [Name, SetName] = useState("");
  const idGroup = localStorage.getItem("classGroupURL");
  const professors = useSelector((state) => state.classesGroup.listProfessors);
  let currentClass;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClasses());
    dispatch(getAllProfessors());
    dispatch(GetClaseesById(localStorage.getItem("classURL"))).then((res) => {
      currentClass = res;
    });
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const [selectedItem, SetSelectedItem] = useState(0);
  const [selectedItem2, SetSelectedItem2] = useState(0);
  const ClassesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < classess.length; i++) {
    const option = {
      key: classess[i]._id,
      text: classess[i].name,
      value: classess[i].name,
    };

    ClassesOptions.push(option);
  }

  const ProfessorsOptions = [{}];

  for (let i = 0; i < professors.length; i++) {
    const option = {
      key: professors[i]._id,
      text: professors[i].email,
      value: professors[i].email,
    };

    ProfessorsOptions.push(option);
  }

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    // await console.log(selectedItem);
  };

  const handleChangeSelect2 = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem2(e.target.value);
    await console.log(selectedItem2);
  };

  const addSection = () => {
    console.log(selectedItem);
    dispatch(GetClaseesById(selectedItem)).then((res) => {
      currentClass = res.payload;
      console.log("teeeeeessstttt !!!!!!!!!!!!");
      console.log(res.payload);
      const section = {
        idProf: selectedItem2,
        classUsers: currentClass.classUsers,
        idGroup: currentClass.idGroup,
        name: Name,
        idClasses: currentClass._id,
      };
      dispatch(AddSection(section));
    });
  };

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={Name}
          onChange={handleChangeName}
          margin="normal"
          variant="outlined"
          required
        />

        <Select
          className="select"
          value={selectedItem}
          onChange={handleChangeSelect}
          input={<OutlinedInput name="Groupe" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ClassesOptions.map((c, index) => (
            <MenuItem key={index} value={c.key}>
              {c.text}
            </MenuItem>
          ))}
        </Select>

        <br />
        <Select
          value={selectedItem2}
          onChange={handleChangeSelect2}
          input={<OutlinedInput name="Professors" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ProfessorsOptions.map((c, index) => (
            <MenuItem key={index} value={c.key}>
              {c.text}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={addSection}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Add Section
          <AddIcon className={classes.rightIcon} />
        </Button>
      </form>
    </div>
  );
}

export default AddSectionForm;
