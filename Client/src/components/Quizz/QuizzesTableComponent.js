import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Button, Modal } from "react-bootstrap";

export function QuizzesTableComponent({ props, className }) {
    const [quizzes, setQuizzes] = useState( [] )
    const user = useSelector(state => state.auth.user)
    const history = useHistory()
    
    if(user.role !== 'professor' && user.role !== 'student' )
        history.push('/')

    useEffect( () => { if(user.role === 'professor')
        axios(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/MyQuizzesProf/' + user._id).then( (data) => setQuizzes(data.data) )
        else if(user.role === 'student')
        axios(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/MyQuizzesStudent/' + user._id).then( (data) => setQuizzes(data.data) )
    }, [])

    function handleDeleteQuizz(quizzId){
        axios.delete(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/DeleteQuizz/' + user._id + '/' + quizzId).then( (data) => { if(data.data == '1') setQuizzes( oldstate => oldstate.filter( qzz => qzz._id != quizzId ) ) } )
    }

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            My Quizzes
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            You Have a Total of {quizzes.length} Quizzes(s)
          </span>
        </h3>          
      </div>
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ minWidth: "200px" }} >QuizzId</th>
                <th className="p-0" style={{ minWidth: "100px" }} >Title</th>
                <th className="p-0" style={{ minWidth: "125px" }} >Total Questions</th>
                { user.role === 'professor' && <th className="p-0" style={{ minWidth: "125px" }} >Total Students</th> }
                <th className="p-0" style={{ minWidth: "150px" }} >CourseId</th>
                <th className="p-0" style={{ minWidth: "150px" }} >Actions</th>
              </tr>
            </thead>
            <tbody>
                { quizzes.map( (quizz, index) =>
              <tr key={index} >
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                    { quizz._id }
                  </div>
                </td>
                <td className="pl-0">
                  { quizz.title }
                </td>
                <td className="text-left">
                  { quizz.questions.length }
                </td> { user.role === 'professor' &&
                <td className="text-left">
                { quizz.students.length }
                </td> }
                <td className="text-left">
                  { quizz.course }
                </td>
                <td className="text-left pr-0">
                { user.role === 'professor' ?
                  <>
                  <a className="btn btn-icon btn-light btn-sm" onClick={ () => handleDeleteQuizz(quizz._id) }  >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Trash.svg"
                        )}
                      ></SVG>
                    </span>
                  </a></> : quizz.grades.filter( grade => grade.student == user._id)[0] ?
                  <button className="btn btn-primary" >Grade: {quizz.grades.filter( grade => grade.student == user._id)[0].grade}</button> :
                  <button className="btn btn-success"  onClick={ () => history.push('/TakeQuizz/' + quizz._id ) } >Take Quizz !</button>
                    }
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
