import {Box} from '@mui/material'
import { useState } from 'react';
import AddEditExpenseModal from '../AddExpenseModal/ExpensesModal'
export default function ExpenseBalance({expenseList,expenseBalance,setExpenseList,isEdit}) {
    const [toggleModal, setToggleModal] = useState(false);

    const handleOpen = () => setToggleModal(true);
    const handleClose = () => setToggleModal(false);
    return (
        <Box sx={{
                background: '#9B9B9B',
                height: '90%',
                width: '48%',
                borderRadius: '15px',
                textAlign: 'center',
                alignContent: 'center'

            }}
        >
            <h6 style={{marginBottom:'10px',fontWeight: 400,fontSize:'30px',fontFamily:'Ubuntu', color: '#ffff'}}>Expenses: <span style={{color: '#F4BB4A',fontWeight: 400,fontSize:'30px',fontFamily:'Ubuntu'}}>₹{expenseBalance}</span></h6>
            {
                toggleModal && (
                    <AddEditExpenseModal isEdit={isEdit} expenseList={expenseList} expenseBalance={expenseBalance} setExpenseList={setExpenseList} handleClose={handleClose} open={toggleModal}/>
                )
            }
            <button onClick={handleOpen} style={{borderRadius: '10px',padding: '5px 15px',border: 'none',color: '#FFFFFF', background: 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)'}}>+ Add Expense</button>
        </Box>
    )
}