import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Button, Modal } from "react-bootstrap";

export function MeetopiasTableComponent({ props, className }) {
    const user = useSelector(state => state.auth.user)
    const history = useHistory()
    
    if(user.role !== 'professor' && user.role !== 'admin' )
        history.push('/dashboard')

    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState()
    const [meetopias, setMeetopias] = useState([])
    const [newTitle, setNewTitle] = useState('')
  
    useEffect( () => { axios.get( process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT 
    + '/Meetopia/GetMeetopiasByProf/' + user._id).then( (data) => { if(data.data != '0') setMeetopias(data.data) } ).catch( (err) => console.log(err) ) }
    , [] )

    function handleDelete(roomId){
        axios.delete( process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT 
    + '/Meetopia/' + user._id + '/' + roomId ).then( (data) => {  if(data.data == '1') setMeetopias( (oldstate) =>  oldstate.filter( meet => meet._id != roomId) ) } )
    .catch( (err) => console.log(err) )
    }

    function handleAttendanceClose() { setShowAttendanceModal(false) }
    function handleAttendanceShow(roomIndex) { setShowAttendanceModal(true); setSelectedRoomIndex(roomIndex) }
    function handleTitleClose() { setShowTitleModal(false); }
    function handleTitleShow(roomIndex) { setShowTitleModal(true); setSelectedRoomIndex(roomIndex) }

    function handleTitleChange(){
        axios.put( process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT 
    + '/Meetopia/ChangeTitle', {"roomId": meetopias[selectedRoomIndex]._id,"profId": meetopias[selectedRoomIndex].professor, "title": newTitle } )
    .then( (data) => {  if(data.data == '1') { meetopias[selectedRoomIndex].title = newTitle; setNewTitle(''); } } )
    .catch( (err) => console.log(err) )
        handleTitleClose()
    }

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            My Meetopias {showAttendanceModal}
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            You Have { meetopias.length } Total Meetopia(s)
          </span>
        </h3>          
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "50px" }} />
                <th className="p-0" style={{ minWidth: "200px" }} >RoomId</th>
                <th className="p-0" style={{ minWidth: "100px" }} >Title</th>
                <th className="p-0" style={{ minWidth: "125px" }} >Start Date</th>
                <th className="p-0" style={{ minWidth: "150px" }} >Actions</th>
              </tr>
            </thead>
            <tbody>
                {meetopias.map( (meetopia, index) =>
              <tr key={index} >
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    <span className="symbol-label">
                      <SVG
                        className="h-50 align-self-center"
                        src={toAbsoluteUrl("/media/svg/misc/015-telegram.svg")}
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <Link
                    to={ "/Meetopia/" + meetopia._id }
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    { meetopia._id }
                  </Link>
                </td>
                <td className="text-left">
                  <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    { meetopia.title }
                  </span>
                </td>
                <td className="text-left">
                  <span className="text-muted font-weight-500">
                    { moment(meetopia.startDate).format("MMMM Do YYYY, h:mm:ss a") }
                  </span>
                </td>
                <td className="text-left pr-0">
                  <a className="btn btn-icon btn-light btn-sm" onClick={ () => handleAttendanceShow(index) }>
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Settings-1.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a className="btn btn-icon btn-light btn-sm mx-3" onClick={ () => handleTitleShow(index) } >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                  <a className="btn btn-icon btn-light btn-sm" onClick={ () => handleDelete(meetopia._id) } >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showAttendanceModal} onHide={handleAttendanceClose}>
            <Modal.Header closeButton>
                <Modal.Title>Attendance List { meetopias[selectedRoomIndex] && ' Total Of ' + meetopias[selectedRoomIndex].attendance.length + ' Were Present !'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { meetopias[selectedRoomIndex] && meetopias[selectedRoomIndex].attendance.map( (student, ind) => 
                <div key={ind} > { 'FirstName: ' + student.firstname + ' LastName: ' + student.lastname + ' Email: ' + student.email } </div>) }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={ handleAttendanceClose} >{'Close !' }</Button>
                <Button variant="primary" >Export To Json !</Button>    
            </Modal.Footer>
        </Modal>

        <Modal show={showTitleModal} onHide={handleTitleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Room's Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <input type="text" 
                    onChange={ (e) => { setNewTitle(e.target.value);  } }
                    className="form-control" placeholder="Enter The New Title..."/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={ handleTitleClose} >{'Close !' }</Button>
                <Button variant="primary" onClick={ handleTitleChange } >Change Title !</Button>    
            </Modal.Footer>
        </Modal>
    </div>
  );
}
