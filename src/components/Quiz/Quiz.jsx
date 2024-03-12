import React from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
import { useState, useRef } from 'react'

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    
    let options = [option1, option2, option3, option4];

    const checkAnswer = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setLock(true);
                setScore(score+1);
            }
            else {
                e.target.classList.add('incorrect');
                setLock(true);
                options[question.ans-1].current.classList.add('correct');
            }
        }
    }
    const nextBtn = () =>{
        if (lock === true){
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            options.map((option)=>{
                option.current.classList.remove('correct');
                option.current.classList.remove('incorrect');
                return null;
        })
        }
    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
            </ul>
            <button onClick={()=>{nextBtn()}}>Next</button>
            <div className="index">{index+1} of {data.length} Questions</div>
        </div>
    )
}

export default Quiz
