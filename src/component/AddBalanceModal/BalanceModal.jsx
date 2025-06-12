import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
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

export default function AddBalance({handleBalance,balance,handleClose,open}) {
  const [currentBalance, setCurrentBalace] = useState('');
  const closeModal = () => handleClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentBalance > balance) {
      console.log('Current bal is greater than bal...');
      handleClose();
      return;
    }
    handleBalance(Number(currentBalance));
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
        <div style={style}>
          <h1 style={{
            fontFamily: 'Ubuntu',
            fontWeight: '700',
            fontSize: '30px',
            lineHeight: '100%',
            marginBottom: '20px'
            
          }}
          >
            Add Balance</h1>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <input name="balance" value={currentBalance} onChange={(e) => setCurrentBalace(e.target.value)} style={{width: '130px', border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px',outline: 'none'}} type="text" placeholder='Income Amount' />
              <button type='submit' style={{width: '100px',background: 'linear-gradient(0deg, #F4BB4A, #F4BB4A)',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#FFFFFF',fontFamily: 'Open Sans',fontWeight: '700', fontSize: '16px'}}>Add Balance</button>
              <button type='submit' onClick={handleClose} style={{width: '80px',border: 'none',boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',padding: '10px 5px', borderRadius: '15px', outline: 'none', color: '#000000',fontFamily: 'Open Sans',fontWeight: '400', fontSize: '16px'}}>Cancel</button>
            </div>            
          </form>
        </div>
      </Modal>
    </div>
  );
}


