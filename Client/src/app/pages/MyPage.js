/*import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");

  return (<>My Page</>);
};
*/
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TaskBoard from '../../components/TaskBoard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop:100,
  },
  Todo: {
    fontSize: theme.typography.pxToRem(55),
    flexBasis: '33.33%',
    flexShrink: 0,
    color : "aqua",
    paddingInline: 100,
  },
  Doing: {
    fontSize: theme.typography.pxToRem(55),
    flexBasis: '33.33%',
    flexShrink: 0,
    color : "aqua",
    paddingInline: 500,
  },
  Done: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
    color : "aqua",
    paddingInline: 1050,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export  function MyPage() {
  const classes = useStyles();

  const mystyle = {
    color: "blue",
    fontSize : 30  ,
    fontFamily: "cursive"
  };
  const [count, setCount] = useState(0);

  return (
      <div className={classes.root}>
        <br/>
        <div className="d-flex justify-content-around">
          <div style={mystyle }>To Do</div>
          <div style={mystyle } >Doing</div>
          <div style={mystyle }>Done</div>
        </div>
        <TaskBoard questions={  count}> </TaskBoard>
      </div>
  );
}

