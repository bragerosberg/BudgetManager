import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import './month.css';

const Month = (props) => {
  const [editMonth, editMonthState] = useState(false);
  const [usedMonth, setMonthUsed] = useState(0);
  const [remainingMonth, updateMonthlyRemaining] = useState(props.monthlyBudget);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    updateMonthlyRemaining(props.monthlyBudget - usedMonth);
  }, [props.monthlyBudget]);

  useEffect(() => {
    const total = expenses.reduce((accumulator, currentValue) => accumulator += parseInt(currentValue.amount), 0);
    setMonthUsed(total);
    updateMonthlyRemaining(props.monthlyBudget - total);
  }, [expenses]);

  const handleClearExpenses = () => {
    setExpenses([]);
  }

  const clickHandler = () => {
    editMonthState(!editMonth);
  }

  const handleName = event => {
    setName(event.target.value)
  }
  
  const handleAmount = event => {
    setAmount(event.target.value)
  }

  const handleSubmitForm = event => {
    event.preventDefault()
    if (name !== '' && amount > 0) {
      const expense = { name, amount }
      setExpenses([...expenses, expense])
      setName('')
      setAmount('')
    } else {
      console.log('Invalid expense name or the amount')
    }
  }



  return editMonth ? (
    <section className="month--section">
      <h2 className="month__name">{props.month}</h2>
      <aside className="month__expenses">
        <section className="month__expenses--numbers">
          <p>Budget: {props.monthlyBudget}</p>
          <p>Remaining: {remainingMonth}</p>
          <p>Used: {usedMonth}</p>
        </section>
        <div className="month__expenses--table">
          {expenses.map(exp => (
            <>
              <p className="month__expenses--table__entry">{exp.name} - ${exp.amount}</p>
            </>
          ))}
        </div>
      </aside>
      <div className="month__buttons">
        <button className="month__buttons--goBack" onClick={clickHandler}/>
        <Form 
          handleSubmitForm={handleSubmitForm}
          amount={amount}
          name={name}
          handleName={handleName}
          handleAmount={handleAmount}
        />
        <button className="month__buttons--deletebtn" onClick={handleClearExpenses}/>
      </div>
    </section>
  ) : (
    <section className="month--section">
      <h2 className="month__name">{props.month}</h2>
      <p>{usedMonth}/{props.monthlyBudget}</p>
      <button className="btn btn-success" onClick={clickHandler}>Edit Month</button>
    </section>
  )
}

export default Month;