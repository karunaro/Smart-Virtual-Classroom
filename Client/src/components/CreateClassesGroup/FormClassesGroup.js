import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  AddclassesGroup,
  getAllProfessors,
} from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

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
function FormClassesGroup() {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const [selectedItem, SetSelectedItem] = useState(0);
 

  

  const professors = useSelector((state) => state.classesGroup.listProfessors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfessors());
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };
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

  const addclassesGroup = () => {
    const classesGroup = {
      name: Name,
      idOwner: selectedItem,
    };

    dispatch(AddclassesGroup(classesGroup));
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
          onClick={addclassesGroup}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Add
          <AddIcon className={classes.rightIcon} />
        </Button>
      </form>
    </div>
  );
}

export default FormClassesGroup;
