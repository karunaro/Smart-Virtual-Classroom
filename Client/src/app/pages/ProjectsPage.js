/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../src/_metronic/_helpers";

import ModalProject from '../../components/ModalProject'
import axios from "axios";
import ModalAddProject from '../../components/ModalAddProject'

export function ProjectsPage({ className }) {
    const [project,setproject]= useState([])
    useEffect(()=>console.log(project),[project])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/`)
            .then(res => {
                console.log(res.data)
                setproject(res.data)

            })
            .catch(err => {
                console.log(err)})
    },[])

    function handleDelete(projectid){
        axios.delete(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/`+projectid)
            .then( () => {   setproject( (oldstate) =>  oldstate.filter( projct => projct._id != projectid) ) } )
            .catch( (err) => console.log(err) )
    }
    console.log(project)
    return (
        <>

            <div className={`card card-custom ${className}`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">

          <span className="card-label font-weight-bolder text-dark">
            Projects List
          </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">

          </span>
                    </h3>
                    <div className="card-toolbar">
                        <ModalAddProject projectid={1} onChange={(newprojects) => setproject(newprojects.data)}  ></ModalAddProject>



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
                                    Projects
                                </th>
                                <th style={{ minWidth: "200px" }} />

                                <th style={{ minWidth: "150px" }}>Topic</th>
                                <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                    action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {project.map((project,index) =>
                                <tr key={index}>
                                    <td className="pl-0">
                                        {index+1}
                                    </td>
                                    <td className="pr-0 p-4">
                                        <a
                                            href="#"
                                            className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                        >
                                            {project.title}
                                        </a>
                                        <span className="text-muted font-weight-bold text-muted d-block">

                  </span>

                                    </td>
                                    <td className="pl-0">
                         </td>

                                    <td>
                                         <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {project.topic}
                  </span>

                                    </td>
                                    <td className="pr-0 text-right">

                                        <ModalProject projectid={project._id}> </ModalProject>

                                         <a
                                             onClick={ () => handleDelete(project._id) }
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
