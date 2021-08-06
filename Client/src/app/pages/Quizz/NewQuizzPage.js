import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux" 
import axios from "axios";

export function NewQuizzPage(props, className ){
    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    if(user.role!=='professor') history.push('MyQuizzes')
    const [question, setQuestion] = useState('')
    const [firstAnswer, setFirstAnswer] = useState('')
    const [secondAnswer, setSecondAnswer] = useState('')
    const [thirdAnswer, setThirdAnswer] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [questions, setQuestions] = useState( [] )
    const [showAddQuizzModal, setShowAddQuizzModal] = useState(false)
    const [studentsList, setStudentsList] = useState([])
    const [coursesList, setCoursesList] = useState([])
    const [quizz, setQuizz] = useState( undefined )
    const [quizzTitle, setQuizzTitle] = useState( '' )
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')
    useEffect( () => {
    axios(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/course').then((data)=> setCoursesList(data.data) );
    axios(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/users/allstudent').then((data)=> setStudentsList(data.data) )}, [])
    useEffect( () => { if(quizz ) axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/AddNewQuizz', quizz).then( (data) => { if(data.data == '1') history.push('/MyQuizzes')}) }, [quizz])

    function handleAddQuizzModalClose() { setShowAddQuizzModal(false) }

    return (<div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Create New Quizz
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            You Have a Total of {questions.length} Questions(s)
          </span>
        </h3>          
      </div>
      <div className="card-body pt-3 pb-0">
          <label>Question: </label><input type="text" placeholder="Enter The Question..." value={question} onChange={ (e) => setQuestion(e.target.value) } className="form-control" />
          <label>First Answer: </label><input type="text" placeholder="Enter The First Option..." value={firstAnswer} onChange={ (e) => setFirstAnswer(e.target.value) } className="form-control" />
          <label>Second Answer: </label><input type="text" placeholder="Enter The Second Option..." value={secondAnswer} onChange={ (e) => setSecondAnswer(e.target.value) } className="form-control" />
          <label>Third Answer: </label><input type="text" placeholder="Enter The Second Option..." value={thirdAnswer} onChange={ (e) => setThirdAnswer(e.target.value) } className="form-control" />
          <label>Correct Answer: </label><input type="number" placeholder="Enter The Correct Answer..." value={correctAnswer} onChange={ (e) => setCorrectAnswer(e.target.value) } className="form-control" />
          <div className={"d-flex flex-row-reverse mb-3 mt-3"}>
            <input type="button" value="Add Question !" onClick={ () => { if(question && firstAnswer && secondAnswer && thirdAnswer && correctAnswer) setQuestions( [...questions, { question, firstAnswer, secondAnswer, thirdAnswer , correctAnswer } ] ) } } className="btn btn-primary ml-3" />
          </div>
        <div className="table-responsive mt-5">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ minWidth: "200px" }} >Question</th>
                <th className="p-0" style={{ minWidth: "100px" }} >First Answer</th>
                <th className="p-0" style={{ minWidth: "125px" }} >Second Answer</th>
                <th className="p-0" style={{ minWidth: "150px" }} >Third Answer</th>
                <th className="p-0" style={{ minWidth: "150px" }} >Correct Answer</th>
                <th className="p-0" style={{ minWidth: "150px" }} >Actions</th>
              </tr>
            </thead>
            <tbody>
            {questions.map( (QST, index) =>
              <tr key={index} >
                <td className="pl-0 py-4">
                  <div className="symbol symbol-50 symbol-light">
                      { QST.question }
                  </div>
                </td>
                <td className="pl-0">
                <span className="symbol symbol-50 symbol-light">
                      { QST.firstAnswer }
                      </span>
                </td>
                <td className="text-left">
                  <span className="symbol symbol-50 symbol-light">
                  { QST.secondAnswer }
                  </span>
                </td>
                <td className="text-left">
                  <span className="symbol symbol-50 symbol-light">
                  { QST.thirdAnswer }
                  </span>
                </td>
                <td className="text-left">
                  <span className="symbol symbol-50 symbol-light">
                  { QST.correctAnswer }
                  </span>
                </td>
                <td className="text-left pr-0">
                  <a className="btn btn-icon btn-light btn-sm" onClick={ () => setQuestions( questions.filter( qqs => qqs!== questions[index]) ) }  >
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
          <div className={"d-flex flex-row-reverse mb-3"}>
          <Button className={ "btn btn-success ml-3" } onClick={ () => setShowAddQuizzModal(true) } >Create New Quizz !</Button>
          <Button className={ "btn btn-danger" } onClick={ () => setQuestions( [] ) } >Remove All Questions</Button>
          </div>
          <Modal show={showAddQuizzModal} onHide={handleAddQuizzModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Quizz Details </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Quizz Title: </label><input type="text" onChange={ (e) => setQuizzTitle( e.target.value  ) } className="form-control" placeholder="Enter Quizz Title Here..." />
                <div><label>Students List: </label></div>
                { studentsList.map( ( student, index ) =>
                <div key={index} className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" onChange={(e) => { 
                        if(e.target.checked) {setSelectedStudents( oldstate => [...oldstate, student._id])} 
                        else { setSelectedStudents( oldstate => oldstate.filter(std => std != student._id) ) } } } />
                    <label className="form-check-label" >{ student.email }</label>
                </div> )}
                <div><label>Affect To Course: </label>
                <select className="form-select form-control" size="3" aria-label="size 3 select example" onChange={(e) => setSelectedCourse(e.target.value)}>
                    { coursesList.map( (course, index) =>
                    <option key={index} value={course._id}  >{ course.name }</option>  )}
                </select></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={ handleAddQuizzModalClose} >{'Close !' }</Button>
                <Button variant="primary" onClick={ () => setQuizz( { title: quizzTitle, profId: user._id, students: [...selectedStudents], course: selectedCourse, questions }) } >Add New Quizz !</Button>    
            </Modal.Footer>
        </Modal>
        </div>
      </div>
    </div>
    )
}