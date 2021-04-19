/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../src/_metronic/_helpers";

import ModalGroup from '../../components/ModalGroup'
import axios from "axios";
import { useHistory } from "react-router-dom";
import ProjectsDisplay from '../../components/ProjectsDisplay'

export function GroupPage({ className }) {
    const [group,setgroup]= useState({members: []})
    useEffect(()=>console.log(group),[group])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/`+ history.location.pathname.split('/')[2])
            .then(res => {
                console.log(res.data)
                setgroup(res.data)

            })
            .catch(err => {
                console.log(err)})
    },[])
   const history = useHistory();
    console.log(history.location.pathname.split('/')[2])
    console.log(group)
    return (
        <>

        <div className={`card card-custom ${className}`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">

          <span className="card-label font-weight-bolder text-dark">
            Outsiders
          </span>
                    <span className="text-muted mt-3 font-weight-bold font-size-sm">
            4 Twin 4
          </span>
                </h3>
                <div className="card-toolbar">
                    <ProjectsDisplay></ProjectsDisplay>
                    <ModalGroup>
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG
                  src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Add-user.svg"
                  )}
                  className="h-50 align-self-center"
              ></SVG>
            </span>
                        Add New Member
                    </ModalGroup>
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
                                Students
                            </th>
                            <th style={{ minWidth: "200px" }} />
                            <th style={{ minWidth: "150px" }}>Tasks</th>
                            <th style={{ minWidth: "150px" }}>progress</th>
                            <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {group.members.map((member,index) =>
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
                                    {member.name}
                                </a>
                                <span className="text-muted font-weight-bold text-muted d-block">
                    4 twin 4
                  </span>
                            </td>
                            <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                   Group Module
                  </span>
                                <span className="text-muted font-weight-bold">
                    Front
                  </span>
                            </td>
                            <td>
                                <div className="d-flex flex-column w-100 mr-2">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted mr-2 font-size-sm font-weight-bold">
                        65%
                      </span>
                                        <span className="text-muted font-size-sm font-weight-bold">
                        Progress
                      </span>
                                    </div>
                                    <div className="progress progress-xs w-100">
                                        <div
                                            className="progress-bar bg-danger"
                                            role="progressbar"
                                            style={{ width: "65%" }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td className="pr-0 text-right">
                                <a

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
                                    href="#"
                                    className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                                >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                          )}
                      ></SVG>
                    </span>
                                </a>
                                <a
                                    onClick={()=>  { setgroup((oldstate)=> {return {...oldstate, members: oldstate.members.filter(mbr => mbr._id != member._id)}}); console.log(group) ;  axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/deletememberfromgroup/`+group._id+'/'+member._id)}}
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
