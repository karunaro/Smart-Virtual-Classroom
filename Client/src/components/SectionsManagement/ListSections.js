import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Dropdown } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

import {
  Avatar,
  Box,
  CardHeader,
  Grid,
  GridList,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectionsByClass,
  getSectionsByClassAndProf,
  getSectionsForStudent,
} from "../../redux/Slices/sections";
import DropdownSectionActions from "./DropdownSectionActions";
import { DropdownCustomToggler } from "../../_metronic/_partials/dropdowns";
import AddMembersModal from "../AddMembers/AddMembersModal";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: red[500],
  },
});
export default function ListSections() {
  const sections = useSelector((state) => state.sections.listSectionsByClass);
  const dispatch = useDispatch();
  const userConnected = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userConnected.role === "admin") {
      dispatch(getSectionsByClass(localStorage.getItem("classURL")));
    }

    if (userConnected.role === "professor") {
      dispatch(
        getSectionsByClassAndProf({
          classId: localStorage.getItem("classURL"),
          profId: userConnected._id,
        })
      );
    }
    if (userConnected.role === "student") {
      dispatch(
        getSectionsForStudent({
          idUser: userConnected._id,
          classOb: localStorage.getItem("classURL"),
        })
      );
    }
  }, [localStorage.getItem("classURL"), dispatch]);
  const classes = useStyles();

  const handleURLSection = (idSection) => {
    localStorage.setItem("sectionURL", idSection);
  };

  return (
    <div>
      <AddMembersModal></AddMembersModal>
      <br />
      <Grid container spacing={3}>
        {sections.map((c, index) => (
          <Grid item xs={3} key={index}>
            <Card className={classes.card} key={index}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="Recipe"
                    className={classes.avatar}
                  ></Avatar>
                }
                action={
                  userConnected.role === "admin" ? (
                    <>
                      {/* <EditCLass idClass={c._id}></EditCLass>
                        <DeleteClass
                          idClass={c._id}
                          name={c.name}
                        ></DeleteClass> */}

                      <div className="card-toolbar">
                        <Dropdown className="dropdown-inline" alignRight>
                          <Dropdown.Toggle
                            id="dropdown-toggle-top"
                            as={DropdownCustomToggler}
                          >
                            <i className="ki ki-bold-more-ver" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                            <DropdownSectionActions
                              idSection={c._id}
                              name={c.name}
                            />
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                }
                subheader={
                  <ReactTimeAgo date={c.dateCreation} locale="en-US" />
                }
              />
              <Link onClick={() => handleURLSection(c._id)} to="/insideClass">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://teamtelefoon.nl/wp-content/uploads/sites/5/2020/03/E-Learning_Illustratie.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {c.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    ></Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
