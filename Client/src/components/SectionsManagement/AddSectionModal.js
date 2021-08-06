import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import SVG from "react-inlinesvg";

import { makeStyles } from "@material-ui/core/styles";

import { useLocation } from "react-router";
import { checkIsActive, toAbsoluteUrl } from "../../_metronic/_helpers";
import AddSectionForm from "./AddSectionForm";
import { useDispatch } from "react-redux";
import { getAllProfessors } from "../../redux/Slices/classesGroup";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export default function AddSectionModal() {
  const location = useLocation();
  const bgImage = toAbsoluteUrl("/media/misc/bg-2.jpg");

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfessors());
  }, [dispatch]);

  return (
    <>
      <div className="col-6">
        <a
          onClick={handleClickOpen}
          href="#"
          className="d-block py-10 px-5 text-center bg-hover-light border-bottom"
        >
          {" "}
          <span className="svg-icon svg-icon-3x svg-icon-success">
            <SVG
              src={
                process.env.PUBLIC_URL +
                "/media/svg/icons/Communication/Address-card.svg"
              }
            ></SVG>
          </span>
          <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
            Add Section
          </span>
          <span className="d-block text-dark-50 font-size-lg">Console</span>
        </a>
      </div>

      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add new Section"}
        </DialogTitle>
        <DialogContent>
          <AddSectionForm></AddSectionForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
