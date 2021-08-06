/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../src/_metronic/_helpers";
import Swal from 'sweetalert2'


import axios from "axios";
import { useHistory } from "react-router-dom";


export function ProfessorsPage({ className }) {
    const [groups,setgroup]= useState([])
    const [searchText, setSearchText] = useState("");
    const [groupe,setgroupe]= useState([])
    useEffect(()=>console.log(groups),[groups])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/allprofessor`)
            .then(res => {
                console.log(res.data)
                setgroup(res.data)
                setgroupe(res.data)
            })
            .catch(err => {
                console.log(err)})
    },[])
    function handleDelete(group)
    {
        Swal.fire({
        title: 'Are you sure?',
        text: 'you will deny the request of this professor',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33', 
        confirmButtonText: 'Yes!'
     }).then((result) => {
        if(result.value){
            axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/refuser`,{email:group.email}).then((data) => {  if(data.data )
                setgroup((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
                setgroupe((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
                 console.log("groupe2");console.log(groups);
                 Swal.fire(
                    'success!',
                    'You denied the request of this professor,An e-mail has been sent',
                    'success'
                  ); 
                 }).catch( (err) => console.log(err) )
       }
     })
        
        }
          function handleApprove(group)
          
          {  Swal.fire({
            title: 'Are you sure?',
            text: 'you will Approve the request of this professor ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
         }).then((result) => {
            if(result.value){
                axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/accepter`,{email:group.email}).then((data) => {  if(data.data )
                    setgroup((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
                    setgroupe((oldstate)=>   oldstate.filter(groups => groups._id != group._id));
                     console.log("groupe2");console.log(groups);  Swal.fire(
                        'success!',
                        'You Approved the request of this professor,An e-mail has been sent',
                        'success'
                      );  }).catch( (err) => console.log(err) )
           }
         })
              }
   const history = useHistory();
    console.log(history.location.pathname.split('/')[2])
    console.log("prof")
    console.log(groups)
    const clear = () => {
        
        setSearchText("");
        setgroup(groupe)
      };
    const handleChange = value => {
        
        setSearchText(value);
        filterData(value);
      };
      const excludeColumns = ["_id", "image,resetPasswordToken,password,__v,role"];
      const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        console.log(groupe)
        if (lowercasedValue === "") setgroup(groupe);
        else {
          const filteredData = groupe.filter(item => {
              
            return item.email.toString().toLowerCase().includes(lowercasedValue) || item.firstname.toString().toLowerCase().includes(lowercasedValue)|| item.lastname.toString().toLowerCase().includes(lowercasedValue)
           
          });
          setgroup(filteredData);
        }
      }

    return (
        <>

        <div className={`card card-custom ${className}`}>
            {/* begin::Header */}
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">

          
       
                </h3>
              
            </div>
            {/* end::Header */}
            <div className="container">
  <div className="row">
    <div className="col-4">
                  <form className="quick-search-form">
                <div className="input-group">
                  <div className={`input-group-prepend`}>
                    <span className="input-group-text">
                      <span className="svg-icon svg-icon-lg">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Search.svg"
                          )}
                        />
                      </span>
                    </span>
                  </div>
                  <input
                    type="search"
                    autoFocus={true}
                    placeholder="Search..."
                    value={searchText}
                    onChange={e => handleChange(e.target.value)}
                    className="form-control"
                    style={{ height: 41.65 }}
                  />

                  <div
                    className={`input-group-append }`}
                  >
                    <span className="input-group-text">
                      <i
                        style={{
                          display:
                            searchText && searchText.length > 0
                              ? "flex"
                              : "none",
                        }}
                        onClick={clear}
                        className="quick-search-close ki ki-close icon-sm text-muted"
                      />
                    </span>
                  </div>
                </div>
              </form>
              </div>
              </div>
              </div>

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
                    <span className="symbol symbol-35">
                        
                    <img src={group.image} alt="USER picture"className="h-75 align-self-end" />
                    </span>
                                </div>
                            </td>
                            <td className="pl-0">
                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg"
                                >
                                    {group.firstname}
                                    {group.lastname}
                                </span>
     
                            </td>
                            <td>
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {group.email}
                  </span>
                                
                            </td>
                     
                            <td className="pr-0 text-right">
                                <a
                                onClick={()=> {handleApprove(group)}  }

                                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/General/Unlock.svg"
                          )}
                      ></SVG>
                    </span>
                                </a>
                      
                                <a
                                    onClick={()=> {handleDelete(group)}  }
                                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/General/Lock.svg"
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
