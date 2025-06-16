import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from './ExpensesModal.module.css';
import { useState } from 'react';
import { useEffect } from 'react';


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

export default function AddEditExpenseModal({setBalance, balance,setExpenseBalance,expenseId, isEdit=false,expenseBalance,setExpenseList,handleClose,open}) {  
  const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        date: '',
    })

    useEffect(() => {
      if(isEdit) {
        const data = JSON.parse(localStorage.getItem('expense'));
        let ex = data.find(ele => ele.id === expenseId);
        setFormData({
          title: ex.title,
          category: ex.category,
          price: ex.price,
          date: ex.date,
        })
      }
    },[isEdit])
    
  const closeModal = () => handleClose();  
  const handleChange = (e) => {
    console.log('........ input change')
    const name = e.target.name;
    setFormData(prev => ({...prev, [name] : e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submit .......')
    const data = JSON.parse(localStorage.getItem('expense'));
    const balance = Number(localStorage.getItem('balance'));    
    if(formData.price > balance) {
      console.log("Insufficient balance");
      return;
    }

    isEdit ? (handleEdit(data, balance)) : ( handleAdd(data))
  }
  
  const handleAdd = (data) =>  {        
        let id = data.length > 0 ? data[0].id : 0;      
        setBalance((prev) => prev - Number(formData.price))
        setExpenseList(prev => [{...formData, id : id + 1}, ...prev]);
        setFormData({
            title: '',
            category: '',
            price: '',
            date: '',
        }) 
  }
  const handleEdit = (data, id) => {
    
    console.log('Inside eit....')
    console.log('Id..', expenseId);
    const index = data.findIndex(item => item.id === expenseId);
    console.log(index);
    console.log(data.price);
    const priceDifference = data[index].price - Number(formData.price);
    console.log("Diff bal...", priceDifference)
    setBalance(prev => prev + priceDifference)
    data[index] = {...data[index], ...formData}  
    setExpenseList(data)
    closeModal();
  }

  const handleExpensBalance = () => {
      
    }
  return (
    
    <div>
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
                    <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="number" placeholder='Price' name='price' value={formData.price}/>
                </div>
                <div className={style.form_control_container}>
                  <select 
                    style={{width: '80%',
                            border: 'none',
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                            padding: '10px 5px', 
                            borderRadius: '15px',
                            outline: 'none',
                            fontFamily: "Open Sans",
                            fontSize: '16px',
                            fontWeight: 400,
                            color: 'rgba(145, 145, 145, 1)',
                          }}
                    name="category" 
                    id="" 
                    value={formData.category} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>                
                  </select>
                    {/* <input required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='Select Category' name='category' value={formData.category}/> */}
                    <input className={style.data_input} required onChange={handleChange} style={{width: '80%',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="date" placeholder='dd/mm/yyyy' name='date' value={formData.date}/>
                </div>
                <div className={style.form_control_container}>
                    <button type='submit' style={{width: '40%',background: 'linear-gradient(0deg, #F4BB4A, #F4BB4A)',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#FFFFFF',fontFamily: 'Open Sans',fontWeight: '700', fontSize: '16px'}}>Add Expense</button>
                    <button onClick={closeModal} style={{width: '80px',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#000000',fontFamily: 'Open Sans',fontWeight: '400', fontSize: '16px'}}>Cancel</button>
                </div>                             
            </div>            
          </form>
        </div>
      </Modal>
    </div>
  );
}