/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../src/_metronic/_helpers";


import axios from "axios";
import { useHistory } from "react-router-dom";


export function ProfessorsPage({ className }) {
    const [groups,setgroup]= useState([])
    useEffect(()=>console.log(groups),[groups])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/allprofessor`)
            .then(res => {
                console.log(res.data)
                setgroup(res.data)

            })
            .catch(err => {
                console.log(err)})
    },[])
    function handleDelete(group)
    {axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/refuser`,{email:group.email}).then((data) => {  if(data.data )
         setgroup((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
          console.log("groupe2");console.log(groups); 
          }).catch( (err) => console.log(err) )}
          function handleApprove(group)
          
          {axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/accepter`,{email:group.email}).then((data) => {  if(data.data )
               setgroup((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
                console.log("groupe2");console.log(groups);   }).catch( (err) => console.log(err) )}
   const history = useHistory();
    console.log(history.location.pathname.split('/')[2])
    console.log("prof")
    console.log(groups)
    return (
        <>

        <div className={`card card-custom ${className}`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">

          
       
                </h3>
              
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
                                Professors
                            </th>
                            <th style={{ minWidth: "200px" }} />
                            <th style={{ minWidth: "150px" }}>Email</th>
                            
                            <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {groups.map((group,index) =>
                        <tr key={index}>
                            <td className="pl-0">
                                {index+1}
                            </td>
                            <td className="pr-0">
                                <div className="symbol symbol-50 symbol-light mt-1">
                    <span className="symbol-label">
                        
                      <SVG
                    
                          src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                          className="h-75 align-self-end"
                      ></SVG>
                    </span>
                                </div>
                            </td>
                            <td className="pl-0">
                                <a
                                    href="#"
                                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                >
                                    {group.firstname}
                                    {group.lastname}
                                </a>
     
                            </td>
                            <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {group.email}
                  </span>
                                
                            </td>
                     
                            <td className="pr-0 text-right">
                                <a
                                onClick={()=> {if(window.confirm('Approve this Professors?')){handleApprove(group)}}  }

                                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/General/Settings-1.svg"
                          )}
                      ></SVG>
                    </span>
                                </a>
                      
                                <a
                                    onClick={()=> {if(window.confirm('Delete this Professors?')){handleDelete(group)}}  }
                                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
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
