/*import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");

  return (<>My Page</>);
};
*/
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModalAddvalidation from '../../components/ModalAddvalidation'
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
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

export  function ValidationsPage() {
    const [group,setgroup]= useState({validations:[]})
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/`+ history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res)
                setgroup(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const result = useSelector(state => state.auth.user)
    console.log(result.id)

console.log(group)
    return (
        <>
        <div className={classes.root}>
            <div className="d-flex justify-content-end"> <ModalAddvalidation userid={result.id}></ModalAddvalidation></div>
            {group.validations.map( (group) =>
            <ExpansionPanel  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>{group.validations}</Typography>
                    <Typography className={classes.secondaryHeading}> {group.validations}</Typography>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.thirdHeading}>
                        <div>


                            {group.validations}



                        </div>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>)}





        </div>



    </>
    );
}

