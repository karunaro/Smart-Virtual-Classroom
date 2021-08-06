
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import AddAnswer from '../components/AddAnswer';
import { useHistory} from "react-router-dom";
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button';

import ModalAddQuestion from '../components/ModalAddQuestion';
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(0),

    },
    rightIcon: {
        marginLeft: theme.spacing(2),
    },
    inline: {
        display: 'inline',
    },
}));

export default function  QuestionsGroup () {

    const [questions, setquestion] = useState([])
    //const [group,setgroup]= useState({questions: []})
    useEffect(() => console.log(questions), [questions])
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + `/questions/`)
            .then(res => {
                console.log(res)
                setquestion(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const classes = useStyles();
    const result = useSelector(state => state.auth.user)
    console.log(result.username)
    //const history = useHistory();
    // console.log(history.location.pathname.split('/')[2])
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleDelete(questionid){
        axios.delete(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/questions/`+questionid)
            .then( () => {   setquestion( (oldstate) =>  oldstate.filter( qst => qst._id != questionid) ) } )
            .catch( (err) => console.log(err) )
    }
    function handleClick(event) {
        setAnchorEl(event.currentTarget);

    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (result.role === 'professor' || result.role === 'admin') {
        return (
            <>
                <div className="d-flex justify-content-end"><ModalAddQuestion
                    onChange={(newquestions) => setquestion(newquestions.data)} userid={1}></ModalAddQuestion></div>
                <List className={classes.root}>

                    {questions.map((question, index) =>
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>

                            <ListItemText
                                primary={ "The Question :" + question.question}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body1"

                                            color="primary"
                                        >
                                            { "The Answer :  "  + question.answer }
                                        </Typography>

                                        <br/>
                                        <span className="text-muted font-weight-bold">
                  Posted {" "}
                                            <ReactTimeAgo date={question.date} locale="en-US"/>
                </span>
                                        <div className="d-flex justify-content-end" key={index}>


                                            <AddAnswer questionid={question._id}
                                                       onChange={(answer) => setquestion((oldstate) => [{
                                                           ...oldstate[index],
                                                           question: oldstate[index].answer = answer
                                                       }, ...oldstate].slice(1))}></AddAnswer>
                                            <IconButton aria-label="Delete" className={classes.margin}>
                                                <DeleteIcon onClick={ () => handleDelete(question._id) } fontSize="large" />
                                            </IconButton>

                                        </div>
                                    </React.Fragment>
                                }
                            />


                        </ListItem>

                        )}

                </List>

            </>
        );
    } else {
        return (
            <>
                <div className="d-flex justify-content-end"><ModalAddQuestion
                    onChange={(newquestions) => setquestion(newquestions.data)} userid={1}></ModalAddQuestion></div>
                <List className={classes.root}>

                    {questions.map((question, index) =>
                        <ListItem key={question.date} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ "The Question :" + question.question}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body1"

                                            color="primary"
                                        >
                                            { "The Answer :  "  + question.answer }
                                        </Typography>

                                        <br/>
                                        <span className="text-muted font-weight-bold">
                  Posted {" "}
                                            <ReactTimeAgo date={question.date} locale="en-US"/>
                </span>

                                    </React.Fragment>
                                }
                            />


                        </ListItem>)}
                    <Divider variant="inset" component="li"/>
                </List>
            </>
        );
    }
}
