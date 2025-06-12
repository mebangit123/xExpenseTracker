import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from './ExpensesModal.module.css';
import { useState } from 'react';


const istyle = {
  background: '#EFEFEFD9',
  borderRadius: '15px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '1px solid #ffff',
  boxShadow: 24,
  padding: '20px 30px'
};

export default function AddEditExpenseModal({isEdit=false,expenseBalance,setExpenseList,handleClose,open}) {
  const closeModal = () => handleClose();
  const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        date: '',
    })
  const handleChange = (e) => {
    console.log('........ input change')
    const name = e.target.name;
    setFormData(prev => ({...prev, [name] : e.target.value}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submit .......')
    setExpenseList(prev => [{...formData, id : 1}, ...prev]);
    setFormData({
        title: '',
        category: '',
        price: '',
        date: '',
    })
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={istyle}>
          <h1 style={{
            fontFamily: 'Ubuntu',
            fontWeight: '700',
            fontSize: '30px',
            lineHeight: '100%',
            marginBottom: '20px'
            
          }}
          >
            {isEdit ? "Edit Expenses" : "Add Expenses"}
         </h1>
          <form action="" onSubmit={handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '20px'}}>
                <div className={style.form_control_container}>
                    <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='Title' name='title' value={formData.title}/>
                    <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='Price' name='price' value={formData.price}/>
                </div>
                <div className={style.form_control_container}>
                    <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='Select Category' name='category' value={formData.category}/>
                    <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='dd/mm/yyyy' name='date' value={formData.date}/>
                </div>
                <div className={style.form_control_container}>
                    <button type='submit' style={{width: '40%',background: 'linear-gradient(0deg, #F4BB4A, #F4BB4A)',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#FFFFFF',fontFamily: 'Open Sans',fontWeight: '700', fontSize: '16px'}}>+ Add Expense</button>
                    <button onClick={closeModal} style={{width: '80px',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#000000',fontFamily: 'Open Sans',fontWeight: '400', fontSize: '16px'}}>Cancel</button>
                </div>                             
            </div>            
          </form>
        </div>
      </Modal>
    </div>
  );
}