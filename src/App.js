import React, {useState, useReducer} from 'react';
import './App.css';

const ACTION = {
  TYPING:'typing',
  CLEAR: 'clear',
  RESULT: 'result'
};

const re = /[\+\-/\*.]{2,}/;
const re2 = /[\+\-/\*.]/;
const re3 =/[\+\-]/g;
const re4 =/[0-9.]+/g;
const re5 =/[/\*]/;

function reducer(calculation, action) {
  switch (action.type) {
    case ACTION.TYPING:
      let newFomula = addFomula(action.payload, calculation.fomula);
      return {...calculation, fomula:newFomula};
    case ACTION.CLEAR:
      return {...calculation, fomula:"", result:0};
      case ACTION.RESULT:
        let answer = calculateRsult(calculation.fomula);
        return {...calculation, fomula:answer, result:0};
    default:
  }
}

function calculateRsult(fomula) {
  let expressions = fomula.split(re3).filter(Boolean); //seperate every oprator whitch need multiply or divided first
  let plusAndSubtract = fomula.split(re4).filter(symbol => { // get operands for oprators after multiply or divided
    if(symbol === '+' || symbol === '-')
      return true;
    else
      return false;
  });


  if((fomula.charCodeAt(fomula.length-1) - '0'.charCodeAt(0)) < 0 ) //check last char if it is symbol(not legal)
    return fomula;

  let buffer = expressions.map((expression,index) => { ////multiply or divided numbers
    let operators = expression.split(re5).filter(Boolean);//get operator
    let multiplyAndDivided = expression.split(re4).filter(Boolean);//get operand
    let result = 0;

    if(operators.length === 1)//dont't need acuculate
      return parseFloat(operators[0]);

    for(let i = 0; i < multiplyAndDivided.length; i++) {//do multiply or divided
      if(multiplyAndDivided[i] === '*')
        result = operators[i] * operators[i+1];
      if(multiplyAndDivided[i] === '/') {
        if(operators[i] === 0)
          result = 0;
        else
        result = operators[i] / operators[i+1];
      }
      operators[i+1] = result;
    }

    return result;
  });

  for(let i = 0 ; i < plusAndSubtract.length; i++){ //add or subtract numbers
    if(plusAndSubtract[i] === '+')
      buffer[i+1] = buffer[i] + buffer[i+1];
    else if(plusAndSubtract[i] === '-')
      buffer[i+1] = buffer[i] - buffer[i+1];
  }

  return buffer[buffer.length-1];
  //return eval(fomula);
}

function addFomula(value,origin) {
  let text = origin + value;

  if(origin && origin.length > 0){
    if(text.match(re)) {
      return origin;
    } else {
      return text;
    }
  } else {
    if(value.match(re2)){
      return "";
    } else {
      return value;
    }
  }
  return origin;
}

function App() {
  const [calculation, dispatch] = useReducer(reducer,[{fomula:"", result: 0}]);
  const [fomula, setFomula] = useState('');


  return (
    <>
      <div className="calculator">
        <div className="item1">
          <span>{calculation.fomula ? calculation.fomula : ''}</span>
        </div>
        <div className="item2">
          <button onClick={e => {dispatch({type:ACTION.CLEAR, payload:e.target.innerText})}}>C</button>
        </div>
        <div className="item3">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>/</button>
        </div>
        <div className="item4">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>*</button>
        </div>
        <div className="item5">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>-</button>
        </div>
        <div className="item6">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>7</button>
        </div>
        <div className="item7">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>8</button>
        </div>
        <div className="item8">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>9</button>
        </div>
        <div className="item9">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>+</button>
        </div>
        <div className="item10">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>4</button>
        </div>
        <div className="item11">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>5</button>
        </div>
        <div className="item12">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>6</button>
        </div>
        <div className="item13">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>1</button>
        </div>
        <div className="item14">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>2</button>
        </div>
        <div className="item15">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>3</button>
        </div>
        <div className="item16">
          <button onClick={e => {dispatch({type:ACTION.RESULT, payload:e.target.innerText})}}>E</button>
        </div>
        <div className="item17">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>0</button>
        </div>
        <div className="item18">
          <button onClick={e => {dispatch({type:ACTION.TYPING, payload:e.target.innerText})}}>.</button>
        </div>
      </div>
    </>
  );
}


export default App;
