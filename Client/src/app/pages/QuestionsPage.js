import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import QuestionsGroup from '../../components/QuestionsGroup';

import ModalAddQuestion from '../../components/ModalAddQuestion';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '25.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    thirdHeading: {
        fontSize: theme.typography.pxToRem(24),
        color: theme.palette.text.primary,
    },
}));

export  function QuestionsPage() {
    const result = useSelector(state => state.auth.user)
    console.log(result.id)
    const history = useHistory();
    console.log(history.location.pathname.split('/')[2])
    const classes = useStyles();


    return ( <>
        <div className={classes.root}>
           <div className="d-flex justify-content-end"> <ModalAddQuestion userid={result.id}></ModalAddQuestion></div>
            <QuestionsGroup groupid={history.location.pathname.split('/')[2]}></QuestionsGroup>
        </div>
        </>
    );
}

