import {
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  getListStudentsByClass,
} from "../../redux/Slices/invitations";
import AddMembersForm from "./AddMembersForm";
import { ViewMembers } from "./ViewMembers";

export default function AddMembersModal() {
  const students = useSelector((state) => state.invitations.listStudents);
  const listStudentsByClass = useSelector(
    (state) => state.invitations.listStudentsByClass
  );
  const userConnected = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getListStudentsByClass(localStorage.getItem("classURL")));
  }, [dispatch]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  function handleClickOpen() {
    setOpen(true);
    console.log("true");
  }

  function handleClose() {
    setOpen(false);
    console.log("false");
  }

  return (
    <>
      <Button onClick={handleClickOpen} variant="warning">
        Students List
      </Button>
      <Dialog
        fullScreen={false}
        open={open}
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {userConnected.role === "professor" ? (
          <DialogTitle id="responsive-dialog-title">
            {"Add Students"}
          </DialogTitle>
        ) : (
          <DialogTitle id="responsive-dialog-title">
            {"Class Members"}
          </DialogTitle>
        )}

        <DialogContent>
          <AddMembersForm></AddMembersForm>
          <ViewMembers></ViewMembers>
        </DialogContent>
      </Dialog>
    </>
  );
}
