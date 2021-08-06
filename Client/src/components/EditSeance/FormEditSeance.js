import {
  Button,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getClasses,
  getClassesByIdGroupAndIdProf,
} from "../../redux/Slices/classes";

import {
  Editseances,
  GetSeancesById,
  getseancesByIdClass,
} from "../../redux/Slices/seances";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { getAllSection } from "../../redux/Slices/sections";

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
function FormEditSeance(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const userConnected = JSON.parse(localStorage.getItem("user"));
  const sections = useSelector((state) => state.sections.listSections);

  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(GetSeancesById(localStorage.getItem("seanceURL"))).then(
      (response) => {
        console.log(response);
        SetName(response.payload.name);
        console.log(response.payload.idClasses);
        SetSelectedItem(response.payload.idClasses);
      }
    );
    const obj = {
      idGroup: localStorage.getItem("classGroupURL"),
      idProf: userConnected._id,
    };
    console.log(obj);
    dispatch(getAllSection());
  }, [localStorage.getItem("seanceURL")]);

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const EditSeances = () => {
    const EditedSeance = {
      name: Name,
      _id: localStorage.getItem("seanceURL"),
      idClasses: selectedItem,
    };

    dispatch(Editseances(EditedSeance)).then(() => {
      dispatch(getseancesByIdClass(localStorage.getItem("classURL")));
    });
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
      <Link to="/insideClass">
        <Button
          onClick={EditSeances}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Edit
          <EditIcon className={classes.rightIcon} />
        </Button>
      </Link>
    </form>
  );
}

export default FormEditSeance;
