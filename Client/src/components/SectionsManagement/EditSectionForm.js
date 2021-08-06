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
  getAllProfessors,
  getclassesGroup,
} from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { getSectionsById, EditSection } from "../../redux/Slices/sections";
import { getClasses } from "../../redux/Slices/classes";

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

function EditSectionForm(props) {
  const classes = useStyles();
  const classess = useSelector((state) => state.classes.list);
  const userConnected = JSON.parse(localStorage.getItem("user"));
  const [Name, SetName] = useState("");
  const [selectedItem, SetSelectedItem] = useState(0);
  const [selectedItem2, SetSelectedItem2] = useState(0);
  const idGroup = localStorage.getItem("classGroupURL");
  const professors = useSelector((state) => state.classesGroup.listProfessors);

  let currentClass;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClasses());
    dispatch(getAllProfessors());
    dispatch(getSectionsById(props.idSection)).then((res) => {
      console.log(res);
      console.log(res.payload.idProf);
      SetName(res.payload.name);
      SetSelectedItem(res.payload.idClasses._id);     
      SetSelectedItem2(res.payload.idProf);
    });
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

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

  const editSection = () => {
    console.log(selectedItem);

    const section = {
      _id: props.idSection,
      name: Name,
      idClasses: selectedItem,
      idProf: selectedItem2,
    };
    dispatch(EditSection(section)).then(() => {
      dispatch(getSectionsById(props.idSection));
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
          onClick={editSection}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Edit Section
          <AddIcon className={classes.rightIcon} />
        </Button>
      </form>
    </div>
  );
}

export default EditSectionForm;
