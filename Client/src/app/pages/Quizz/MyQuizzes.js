import React from 'react'
import { QuizzesTableComponent } from '../../../components/Quizz/QuizzesTableComponent'

export function MyQuizzes(props){
    return (<div className="row">
    <div className="col-xxl-12 order-xxl-1">
        <QuizzesTableComponent className="card-stretch gutter-b"/>
    </div>
    </div>)
}