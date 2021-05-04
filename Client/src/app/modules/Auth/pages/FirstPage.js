import React from "react";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import "../../../../_metronic/_assets/sass/pages/error/error-5.scss";
import { makeStyles } from "@material-ui/core/styles";
import {ContentRoute} from "../../../../_metronic/layout"
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px"
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main
    }
}));
export function FirstPage() {
    const classes = useStyles();
    return (
        <div className="d-flex flex-column flex-root">
            <div
                className="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
                style={{
                    backgroundImage: `url(${toAbsoluteUrl("/media/error/bg5.jpg")})`,
                }}
            >
                <div className="container d-flex flex-row-fluid flex-column justify-content-md-center p-12">
                    <Timeline align="alternate">
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    9:30 sam
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <HeadsetMicIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        Apply for registration
                                    </Typography>
                                    <Typography>-Create your account in few seconds </Typography>
                                    <Typography>
                                        -With Edutopia you have the ability The ability to login
                                        professional social networks
                                    </Typography>
                                    <Typography>  Google/LinkedIn </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    10:00 am
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <MenuBookIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        Get access
                                        to courses

                                    </Typography>
                                    <Typography>Because it&apos;s awesome!</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary" variant="outlined">
                                    <LaptopMacIcon />
                                </TimelineDot>
                                <TimelineConnector className={classes.secondaryTail} />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        Meetopia
                                    </Typography>
                                    <Typography>Participate
                                        in a real
                                        time video
                                        conference
                                        of a course , share your screen and enjoy our smart whiteboard</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <GroupWorkIcon />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        Quizz
                                    </Typography>
                                    <Typography>Pass tests
                                        and get
                                        marks </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div></div></div>
    );
}
