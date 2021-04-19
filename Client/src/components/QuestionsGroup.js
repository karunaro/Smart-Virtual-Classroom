
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

import { useHistory} from "react-router-dom";
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

  //   const [questions,setquestion]= useState([])
    const [group,setgroup]= useState({questions: []})
    useEffect(()=>console.log(group),[group])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/questions/` + history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setgroup(res.data)
    })
            .catch(err => {
            console.log(err)})
    },[])


    const classes = useStyles();
    const history = useHistory();
    console.log(history.location.pathname.split('/')[2])
console.log(group.questions)

        return (
<>

        <List className={classes.root}>

            {group.questions.map( (question,index) =>
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={question.answer}
                        secondary={
                            <React.Fragment >
                                <Typography
                                    component="span"
                                    variant="body2"

                                    color="textPrimary"
                                >

                                </Typography>
                                {question.question}
                                <div className="d-flex justify-content-end">

                                    {/*    <AddAnswer questionid={question._id} onChange={(answer)=>setgroup( (oldstate)=> {...oldstate.questions , answer: oldstate.questions.answer= answer}  )} ></AddAnswer>
*/}
                                </div>
                            </React.Fragment>
                        }
                    />

                </ListItem>)}
            <Divider variant="inset" component="li"/>
            </List>
    {/*   <div className="d-flex justify-content-end"> <ModalAddQuestion onChange={(newquestions)=>setquestion(newquestions.data)} userid={1} ></ModalAddQuestion></div>
    */}</>
        );
    }



