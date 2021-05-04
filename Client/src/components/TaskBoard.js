import React , {useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import ModalAddTask from "./ModalAddTask"

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 350,
        height: 230,
        overflow: 'auto',

    },

    button: {
        margin: theme.spacing(0.5, 0),
    },

}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

export default function TaskBoard() {
    const [tasks,settasks]= useState([])
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([tasks]);
    const [center, setCenter] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const centerChecked = intersection(checked, center);
    const history = useHistory();
    useEffect(()=>console.log(tasks),[tasks])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/taskstodo/`+history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setLeft(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/tasksdoing/`+history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setCenter(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/tasksdone/`+history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setRight(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])


    console.log(left)


    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllCenter = () => {
        setCenter(center.concat(left));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/alltodo_doing/'+history.location.pathname.split('/')[2]);
        setLeft([]);
    };
    const handleAllRight = () => {
        setRight(right.concat(center));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/alldoing_done/'+history.location.pathname.split('/')[2]);
        setCenter([]);
    };




    const handleCheckedCenter = () => {
        setCenter(center.concat(leftChecked));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/todo_todoing/'+history.location.pathname.split('/')[2]+'/'+leftChecked[0]);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };
    const handleCheckedRight = () => {
        setRight(right.concat(centerChecked));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/doing_todone/'+history.location.pathname.split('/')[2]+'/'+centerChecked[0]);
        setCenter(not(center, centerChecked));
        setChecked(not(checked, centerChecked));
    };
    const handleCheckedLeft = () => {
        setLeft(left.concat(centerChecked));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/doing_todo/'+history.location.pathname.split('/')[2]+'/'+centerChecked[0]);
        setCenter(not(center, centerChecked));
        setChecked(not(checked, centerChecked));
    };
    const handleCheckedCenterReverse = () => {
        setCenter(center.concat(rightChecked));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/done_todoing/'+history.location.pathname.split('/')[2]+'/'+rightChecked[0]);
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    const handleAllCenterReverse = () => {
        setCenter(center.concat(right));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/alldone_doing/'+history.location.pathname.split('/')[2]);
        setRight([]);
    };
    const handleAllleft = () => {
        setLeft(left.concat(center));
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+'/project/alldoing_todo/'+history.location.pathname.split('/')[2]);
        setCenter([]);
    };

    const customList = tasks => (

        <>

        <Paper className={classes.paper}>

            <List dense component="div" role="list">

                {tasks.map((value, index) => {
                    const labelId = `transfer-list-item-${index}-label`;

                    return (


                        <ListItem key={index} role="listitem" button onClick={handleToggle(value)}>


                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId}  primary={` ${value }`} />
                        </ListItem>

                    );
                })}
                <ListItem />
            </List>
        </Paper>
            </>
    );

    return (
        <>
         <label>        </label>   <ModalAddTask projectid={history.location.pathname.split('/')[2]}
                                                 onChange={(newtasks) => setLeft((newtasks.data))} ></ModalAddTask>

        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllCenter}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedCenter}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={centerChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllleft}
                        disabled={center.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(center)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={center.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={centerChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedCenterReverse}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllCenterReverse}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>

        </Grid>
</>
    );

}
