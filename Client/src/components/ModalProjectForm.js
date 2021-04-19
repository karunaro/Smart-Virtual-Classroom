
import React, {useEffect, useState} from 'react';

import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function ModalProjectForm(props) {
    const [group,setgroup]= useState([])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/`)
            .then(res => {
                console.log(res)
                setgroup(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])



    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(true);
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const classes = useStyles();



    return (

        <List dense className={classes.root}>
            {group.map((group,index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                    <ListItem onClickCapture={handleClick} key={index} button onClick={  ()=>{ axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/addproject/`+group._id+'/'+props.projectid)}} >

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id"> Project affected ! </span>}
                            action={[

                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${index + 1}`}
                                src={`/static/images/avatar/${index + 1}.jpg`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={group.name} />
                        <ListItemSecondaryAction>
                            Click to affect!
                        </ListItemSecondaryAction>

                    </ListItem>

                );

            })}

        </List>

    );
}
