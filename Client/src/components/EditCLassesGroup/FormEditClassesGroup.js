import { Button, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";

import {
  EditclassesGroup,
  getAllProfessors,
  GetclassesGroupById,
} from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

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

function FormEditClassesGroup(props) {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const [selectedItem, SetSelectedItem] = useState(0);
  const professors = useSelector((state) => state.classesGroup.listProfessors);
  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProfessors());
    dispatch(GetclassesGroupById(props.idGroup)).then((response) => {
      console.log(response);
      SetName(response.payload.name);
      SetSelectedItem(response.payload.idOwner._id);
    });
  }, [props.idGroup]);

  const ProfessorsOptions = [{ key: Number, text: "", value: "" }];

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
    await console.log(selectedItem);
  };

  const Editclasses = () => {
    const EditedClass = {
      name: Name,
      _id: props.idGroup,
      idOwner: selectedItem,
    };

    dispatch(EditclassesGroup(EditedClass));
  };

  return (
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
        value={selectedItem}
        onChange={handleChangeSelect}
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
        onClick={Editclasses}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Edit
        <EditIcon className={classes.rightIcon} />
      </Button>
    </form>
  );
}

export default FormEditClassesGroup;
