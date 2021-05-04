import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 450,
    width: 300
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
    marginTop: 25
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export function DashboardPage() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})} >
          <Paper elevation={4} className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className="text-center" color="textSecondary" gutterBottom>Course Management</Typography>
                <img className="rounded-circle" src="http://localhost:466/media/dashboard/course.jpg" width="270" heigth="250" ></img>
                <Typography variant="body2" component="p" className={classes.title }>
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaninfdhgfdhgfdhf
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grow>
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})} >
          <Paper elevation={4} className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className="text-center" color="textSecondary" gutterBottom>Video-conference Rooms</Typography>
                <img className="rounded-circle" src="http://localhost:466/media/dashboard/video.png" width="270" heigth="250" ></img>
                <Typography variant="body2" component="p" className={classes.title }>
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaninfdhgfdhgfdhf
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grow>
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})} >
          <Paper elevation={4} className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className="text-center" color="textSecondary" gutterBottom>Quizz Management</Typography>
                <img className="rounded-circle" src="http://localhost:466/media/dashboard/quizz.jpg" width="270" heigth="250" ></img>
                <Typography variant="body2" component="p" className={classes.title }>
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaninfdhgfdhgfdhf
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell </Typography><Typography variant="body2" component="p" className={classes.title}>well meaning and kindly.</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grow>
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})} >
          <Paper elevation={4} className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className="text-center" color="textSecondary" gutterBottom>Group Management</Typography>
                <img className="rounded-circle" src="http://localhost:466/media/dashboard/group.jpg" width="270" heigth="200" ></img>
                <Typography variant="body2" component="p" className={classes.title }>
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaning and kindly.hgdhdhfdhgfdhgfdhfwell meaninfdhgfdhgfdhf
                well meaning and kindly.hgdhdhfdhgfdhgfdhfwell </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grow>
      </div>
    </div>
  );
}