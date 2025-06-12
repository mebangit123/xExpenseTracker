import {Box} from '@mui/material';
import AddBalance from '../AddBalanceModal/BalanceModal'
import { useState } from 'react';
export default function WalletBalance({handleBalance, balance}) {
    
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
            <h6 style={{marginBottom:'10px',fontWeight: 400,fontSize:'30px',fontFamily:'Ubuntu', color: '#ffff'}}>Wallet Balance: <span style={{color: '#9DFF5B',fontWeight: 400,fontSize:'30px',fontFamily:'Ubuntu'}}>₹{balance}</span></h6>
            {
                toggleModal && (
                    <AddBalance handleBalance={handleBalance} balance={balance} handleClose={handleClose} open={toggleModal}/>
                )
            }
            <button type='sumbit' onClick={handleOpen} style={{borderRadius: '10px',padding: '5px 15px',border: 'none',color: '#FFFFFF', background: 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)'}}>+ Add Income</button>            
        </Box>
    )
}