/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";
import ModalAddGroup from '../../components/ModalAddGroup'
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        marginRight: 60,
        marginBottom: 50,
    },
    media: {
        height: 140,
    },
});

export function Allgroups({ className }) {
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
    const classes = useStyles();
    const history = useHistory();
    function handleDelete(groupid){
        axios.delete(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/`+groupid)
            .then( () => {   setgroup( (oldstate) =>  oldstate.filter( groupe => groupe._id != groupid) ) } )
            .catch( (err) => console.log(err) )
    }
    return (
        <>
        <div className="d-flex justify-content-end"><ModalAddGroup
            onChange={(newgroups) => setgroup(newgroups.data)} ></ModalAddGroup></div>
<div className="row">

    {group.map( (group,index) =>
        <Card key={index} className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://image.freepik.com/free-vector/group-young-students-flat-style-illustration-isolated-white_180264-19.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {group.name}
                    </Typography>
                    <Typography variant="body2"   color="textSecondary" component="p">
                        {group.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="d-flex justify-content-end">
                <Button onClick={()=>(history.push('/group/' + group._id))}  size="lg" color="primary" >
                    Details
                </Button>



                <Button onClick={()=>(history.push('/validations/' + group._id))}  size="lg" color="primary" >
                    Validations
                </Button>
                <IconButton aria-label="Delete" className={classes.margin}>
                    <DeleteIcon onClick={ () => handleDelete(group._id) } fontSize="large" />
                </IconButton>

            </CardActions>
        </Card>)}
</div>
            </>
    );
}
