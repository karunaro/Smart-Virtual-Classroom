
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Col, Form} from "react-bootstrap";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',

        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


export default function AddSession() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Form className="p-8">
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add Seance</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>

            <input type="file" />
<br/> <br/>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
}
