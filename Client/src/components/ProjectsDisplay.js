
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectsDisplay() {
    const history = useHistory();
    const [group,setgroup]= useState({projects: []})
    useEffect(()=>console.log(group),[group])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/projects/` + history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setgroup(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])
    const classes = useStyles();

    console.log(group.projects)
    const [open, setOpen] = React.useState(false);


    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Assigned Projects
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Projects for {group.name}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <List>
                    {group.projects.map( (project,index) =>
                    <ListItem button key={index}>
                        <ListItemText primary={project.title} secondary={project.topic} />
                    </ListItem>
               )}

                </List>
            </Dialog>
        </div>
            </>
    );
}
