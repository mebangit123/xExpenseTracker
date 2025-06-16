import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";
import style from './TransanctionCard.module.css'
import AddEditExpenseModal from '../AddExpenseModal/ExpensesModal'
import { useState } from 'react';

function TransanctionCard({setExpenseList,isEdit, expense, expenseId}) {
    const [toggleModal, setToggleModal] = useState(false);
    const handleOpen = () => setToggleModal(true);
    const handleClose = () => setToggleModal(false);
  return (
    <>
        <div className={style.wrapper}>
            <div className={style.one}>
                <div className={style.icon} style={{}}><PiPizza /></div>
                <div className={style.info}>
                    <h5>{expense.title}</h5>
                    <p>{expense.date}</p>
                </div>
            </div>
            <div className={style.two}>
                <p>₹{expense.price}</p>
                <div className={style.buttonWrapper}>                
                    <button className={style.btnDelete}><IoMdCloseCircleOutline /></button>
                    <button onClick={(e) => {
                        console.log(e);
                        handleOpen()
                        }} 
                        className={style.btnEdit}
                    >
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>
        </div>
        {toggleModal && (
            <AddEditExpenseModal setExpenseList={setExpenseList} isEdit={isEdit}  handleClose={handleClose} open={toggleModal} expenseId={expenseId} />
        )}                
    </>
  )
}

export default TransanctionCard
