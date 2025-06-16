import React, { useState } from 'react'
import TransanctionCard from '../TransanctionCard/TransanctionCard'
import style from './ExpenseTransanction.module.css'
function ExpenseTransanction({isEdit, setIsEdit, expenseList, expenseBalance, setExpenseList, setExpenseBalance, balance, setBalance}) {
    

    return (
    <div className={style.wrapper}>
        {
            expenseList.length > 0 ? (
                expenseList.map((expense, idx) => (
                    <TransanctionCard setExpenseList={setExpenseList} isEdit={isEdit} expense={expense} expenseId={expense.id} key={idx}/>
                ))                    
            ) : (
                <div>
                    no transanction
                </div>
            )
        }
    </div>    
  )
}

export default ExpenseTransanction
