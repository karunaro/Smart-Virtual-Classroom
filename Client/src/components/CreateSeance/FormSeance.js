import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddSeances, getseancesByIdClass } from "../../redux/Slices/seances";
import { makeStyles } from "@material-ui/core/styles";
import {
  getClasses,
  getClassesByIdGroupAndIdProf,
} from "../../redux/Slices/classes";
import AddIcon from "@material-ui/icons/Add";
import { getAllSection, getSectionsByClass } from "../../redux/Slices/sections";

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

function FormSeance() {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const sections = useSelector((state) => state.sections.listSections);
  const userConnected = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    const obj = {
      idGroup: localStorage.getItem("classGroupURL"),
      idProf: userConnected._id,
    };
    console.log(obj);
    dispatch(getAllSection());
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const [selectedItem, SetSelectedItem] = useState(0);
  const ClassesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < sections.length; i++) {
    const option = {
      key: sections[i]._id,
      text: sections[i].name,
      value: sections[i].name,
    };

    ClassesOptions.push(option);
  }

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    // await console.log(selectedItem);
  };

  const addsenace = () => {
    const seances = {
      name: Name,
      idClasses: selectedItem,
    };

    dispatch(AddSeances(seances)).then(() => {
      dispatch(getseancesByIdClass(localStorage.getItem("classURL")));
    });
  };

  return (
    <>
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

        <Button
          onClick={addsenace}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Add
          <AddIcon className={classes.rightIcon} />
        </Button>
      </form>
    </>
  );
}

export default FormSeance;
