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
import Table from "react-bootstrap/Table";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../src/_metronic/_helpers";
import ModalAddValidation from '../../components/ModalAddvalidation'
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

export  function ValidationsPage({ className }) {
    const [validations, setvalidations] = useState([])
    //const [group,setgroup]= useState({questions: []})
    useEffect(() => console.log(validations), [validations])
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + `/validations/`)
            .then(res => {
                console.log(res)
                setvalidations(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const result = useSelector(state => state.auth.user)
    console.log(result.id)
    function handleDelete(validationid){
        axios.delete(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/validations/`+validationid)
            .then( () => {   setvalidations( (oldstate) =>  oldstate.filter( valid => valid._id != validationid) ) } )
            .catch( (err) => console.log(err) )
    }
    return (
        <>

            <div className={`card card-custom ${className}`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">

          <span className="card-label font-weight-bolder text-dark">
            Validations List
          </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">

          </span>
                    </h3>
                    <div className="card-toolbar">

                        <ModalAddValidation  onChange={(newvalidations) => setvalidations(newvalidations.data)} >
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG
                  src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Add-user.svg"
                  )}
                  className="h-50 align-self-center"
              ></SVG>
            </span>
                            Add New Validation
                        </ModalAddValidation>
                    </div>

                </div>
                {/* end::Header */}

                {/* begin::Body */}
                <div className="card-body py-0">
                    {/* begin::Table */}
                    <div className="table-responsive">
                        <table
                            className="table table-head-custom table-vertical-center"
                            id="kt_advance_table_widget_1"
                        >
                            <thead>
                            <tr className="text-left">
                                <th className="pl-0" style={{ width: "20px" }}>

                                </th>
                                <th className="pr-0" style={{ width: "50px" }}>
                                    Topic
                                </th>
                                <th style={{ minWidth: "200px" }} />
                                <th style={{ minWidth: "150px" }}>Session</th>
                                <th style={{ minWidth: "150px" }}>Asked Work</th>
                                <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                    action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {validations.map((validation, index) =>
                                <tr key={index}>
                                    <td className="pl-0">
                                        {index+1}
                                    </td>
                                    <td className="pr-0 p-4">
                                        <a
                                            href="#"
                                            className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                        >
                                            {validation.topic}
                                        </a>
                                        <span className="text-muted font-weight-bold text-muted d-block">

                  </span>

                                    </td>
                                    <td className="pl-0">
                                    </td>
                                    <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                   {validation.session}
                  </span>
                                        <span className="text-muted font-weight-bold">
                    Front
                  </span>
                                    </td>
                                    <td>
                                         <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {validation.asked_work}
                  </span>

                                    </td>
                                    <td className="pr-0 text-right">

                                        {/*       <ModalProject projectid={project._id}> </ModalProject> */}

                                        <a
                                            onClick={ () => handleDelete(validation._id) }
                                            className="btn btn-icon btn-light btn-hover-primary btn-sm "
                                        >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                          )}
                      ></SVG>
                    </span>
                                        </a>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                    {/* end::Table */}
                </div>
                {/* end::Body */}
            </div>
        </>
    );
}

