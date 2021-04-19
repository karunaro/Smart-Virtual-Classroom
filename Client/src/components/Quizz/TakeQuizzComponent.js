import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Button, Modal } from "react-bootstrap";

export function TakeQuizzComponent({ props, className }) {
    const [quizz, setQuizz] = useState( { questions: [] } )
    const [answers, setAnswers] = useState( [ ] )
    const user = useSelector(state => state.auth.user)
    const history = useHistory()
    const quizzId = history.location.pathname.split('/')[2]
    
    if(user.role !== 'student' )
        history.push('/')

    if( !quizzId )
        history.push('/MyQuizzes')

    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/' + quizzId)
        .then( (data) => { if(data.data != '0') setQuizz(data.data); else history.push('/MyQuizzes')} )
    }, [])

    useEffect( () => console.log(answers), [answers])

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Currently Taking Quizz: {quizzId} 
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            You Have a Total of {quizz.questions.length} Questions(s)
          </span>
        </h3>          
      </div>
      <div className="card-body pt-3 pb-0">
          {quizz.questions.map( (question, index) => 
          <form key={index} className="mt-2"  >
            <div>Question: {question.question} ? </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={question._id} onChange={ (e) => {if(e.target.checked) setAnswers( (oldstate) =>  { if(oldstate[index]) return [...oldstate.slice(0, index ), "1", ...oldstate.slice(index + 1) ]; else return [...oldstate, "1"] ; } ) } } />
                    <label className="form-check-label">{question.firstAnswer}</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={question._id} onChange={ (e) => {if(e.target.checked) setAnswers( (oldstate) =>  { if(oldstate[index]) return [...oldstate.slice(0, index ), "2", ...oldstate.slice(index + 1) ]; else return [...oldstate, "2"] ; } ) } } />
                    <label className="form-check-label">{question.secondAnswer}</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={question._id} onChange={ (e) => {if(e.target.checked) setAnswers( (oldstate) =>  { if(oldstate[index]) return [...oldstate.slice(0, index ), "3", ...oldstate.slice(index + 1) ]; else return [...oldstate, "3"] ; } ) } } />
                    <label className="form-check-label">{question.thirdAnswer}</label>
                </div>
            </form>
          )}
          <div className={"d-flex flex-row-reverse mb-3"}>
          <Button className={ "btn btn-success ml-3" } onClick={ () => { axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/quizzes/PassQuizz', { userId: user._id, quizzId, answers } ).then( (data) => { if(data.data == "1") history.push('/MyQuizzes'); else if (data.data == "0") alert('Error !!')  } ).catch( (err) => alert(err)) } } >Submit !</Button>
          </div>
      </div>
    </div>
  );
}
