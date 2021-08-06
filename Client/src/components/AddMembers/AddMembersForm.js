import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  sendInvitations,
  ListInacceptedByClass,
} from "../../redux/Slices/invitations";
import { Multiselect } from "multiselect-react-dropdown";
import { Button } from "react-bootstrap";

export default function AddMembersForm() {
  const multiselectRef = React.createRef();
  const students = useSelector((state) => state.invitations.listStudents);
  const loadingUsers = useSelector((state) => state.invitations.loadingUsers);
  const [selectedValue, setSelectedValue] = useState([]);
  const classURL = localStorage.getItem("classURL");
  const userConnected = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(ListInacceptedByClass(classURL));
  }, [dispatch]);

  const StudentsOptions = [];

  for (let i = 0; i < students.length; i++) {
    const option = {
      key: students[i]._id,
      text: students[i].firstname,
      value: students[i].email,
    };

    StudentsOptions.push(option);
  }

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

  const sendInvitation = () => {
    for (let i = 0; i < selectedValue.length; i++) {
      dispatch(
        sendInvitations({
          status: "loading",
          classOb: classURL,
          userOb: selectedValue[i].key,
        })
      );
    }
  };

  return (
    <>
      {userConnected.role === "professor" || userConnected.role === "admin" ? (
        <form noValidate autoComplete="off">
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
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button variant="success" onClick={sendInvitation}>
            Send Invitations
          </Button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
