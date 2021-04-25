import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { Route, useParams } from "react-router";

import ListCourses from "./ListCourses";
import ListSeances from "./ListSeances";
import { makeStyles } from "@material-ui/core/styles";
import DetailCourses from "./DetailCourses";
import { Button } from "react-bootstrap";
import AddMembersModal from "./AddMembers/AddMembersModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function InsideClass() {
  const classes = useStyles();
  const { idClass } = useParams();
  return (
    <div>
      <AddMembersModal></AddMembersModal>
      <br />
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={3}>
            <ListSeances></ListSeances>
          </Grid>
          <Grid item xs={9}>
            <Route path={"/listCourses"}>
              <ListCourses idClass={idClass}></ListCourses>
            </Route>

            <Route path={"/DetailCourses"}>
              <DetailCourses></DetailCourses>
            </Route>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default InsideClass;
