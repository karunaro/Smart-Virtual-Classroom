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
import { Addclasses, getClassesByIdGroup } from "../../redux/Slices/classes";
import { getclassesGroup } from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Multiselect } from "multiselect-react-dropdown";
import {
  getAllStudents,
  sendInvitations,
} from "../../redux/Slices/invitations";

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

function FormClass() {
  const multiselectRef = React.createRef();
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const [Section, SetSection] = useState("");
  const groupes = useSelector((state) => state.classesGroup.list);
  const students = useSelector((state) => state.invitations.listStudents);
  const idOwner = localStorage.getItem("idOwner");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getclassesGroup());
    dispatch(getAllStudents());
  }, [dispatch]);
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [selectedItem, SetSelectedItem] = useState(0);
  const [selectedValue, setSelectedValue] = useState([]);
  const ClassesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < groupes.length; i++) {
    const option = {
      key: groupes[i]._id,
      text: groupes[i].name,
      value: groupes[i].name,
    };

    ClassesOptions.push(option);
  }

  const StudentsOptions = [];

  for (let i = 0; i < students.length; i++) {
    const option = {
      key: students[i]._id,
      text: students[i].firstname,
      value: students[i].email,
    };

    StudentsOptions.push(option);
  }

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedValue.concat(selectedItem));

    console.log(selectedValue);
  };
  const onRemove = (selectedList, removedItem) => {
    setSelectedValue(
      selectedList.filter((item) => item.key !== removedItem.key)
    );

    console.log(selectedValue);
  };

  const handleChangeSection = (e) => {
    SetSection(e.target.value);
    console.log(e.target.value);
  };

  const addclass = () => {
    const classes = {
      name: Name,
      idProf: idOwner,
      section: Section,
      idGroup: selectedItem,
    };

    dispatch(Addclasses(classes)).then((res) => {
      dispatch(getClassesByIdGroup(localStorage.getItem("classGroupURL")));
      for (let i = 0; i < selectedValue.length; i++) {
        dispatch(
          sendInvitations({
            status: "loading",
            classOb: res.payload.result._id,
            userOb: selectedValue[i].key,
          })
        );
      }
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

        <TextField
          id="outlined-name"
          label="Section"
          className={classes.textField}
          value={Section}
          onChange={handleChangeSection}
          margin="normal"
          variant="outlined"
          required
        />

        <h1>
          Hello theres please choose the students you wish to add them to this
          class ;)
        </h1>

        <br />
        <Multiselect
          options={StudentsOptions}
          displayValue="value"
          selectedValues={selectedValue}
          onSelect={onSelect}
          onRemove={onRemove}
          ref={multiselectRef}
        />
        <br />
        <br />
        <br />

        <Button
          onClick={addclass}
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

export default FormClass;
