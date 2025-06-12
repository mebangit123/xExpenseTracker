import {Box} from '@mui/material';
import WalletBalance from './component/Wallet/WalletBalance'
import ExpenseBalance from './component/Expense/ExpenseBalance'
import { useEffect, useState } from 'react';
function App() {
  const [balance, setBalance] = useState(0);
  const [isEdit, setIsEdit] = useState(true);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseBalance, setExpenseBalance] = useState(0);

  useEffect(() => {
    let localBalance = localStorage.getItem('balance');
    if (localBalance) {
      handleBalance(Number(localBalance));
    } else {
      handleBalance(5000);
    }
    const expenseItems = JSON.parse(localStorage.getItem('expense'));
    setExpenseList(expenseItems || []);
  },[]);
  
  useEffect(() => {
    console.log('expense change.....')    
    if(expenseList.length > 0) {
      localStorage.setItem('expense', JSON.stringify(expenseList));
    } else {
      setExpenseBalance(0);
    }
  }, [expenseList]);

  const handleBalance = (bal) => {
    localStorage.setItem('balance', bal);
    setBalance(prevBal => prevBal + bal);    
  }
  
  return (
    <Box 
      sx={{
        height: 'calc(100vh - 32px)',
        background: '#3B3B3B',
        margin: 2,
        borderRadius: 0.75,
        paddingTop: 2,
        paddingX: 2,
        boxSizing: 'border-box'
      }}
    >
      <h1 style={{
          fontFamily: 'Ubuntu',
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: '100%',
          margin: 0,
          color: '#FFFFFF'
        }}
      > 
        Expense Tracker
      </h1>   
      <Box sx={{
          border: '1px solid #9B9B9B',
          height: '90%',
          mt: 1
        }}
      >
        <Box sx={{
            boxShadow: '0px 4px 4px 0px #00000040',
            background: '#626262',
            height: '40%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'

          }}
        >
          <div style={{display: 'flex',justifyContent: 'space-between', alignItems:'center', height: '70%',width: '60%', paddingLeft: '50px'}}>
            <WalletBalance handleBalance={handleBalance} balance={balance}/>
            <ExpenseBalance expenseList={expenseList} expenseBalance={expenseBalance} setExpenseList={setExpenseList} />
          </div>   
          <div style={{width: '30%'}}>Other content</div>
        </Box>
        <h1 style={{
            fontFamily: 'Ubuntu',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '100%',
            fontStyle: 'italic',
            color: '#FFFFFF',
            marginTop: 20,
          }}
        > 
          Recent Transaction
        </h1> 
        <Box display='flex'>
          {/* <WalletBalance width='50%' heigth='70%'/>
          <WalletBalance width='50%' heigth='70%'/> */}
        </Box>       
      </Box>       
    </Box>
  );
}

export default App;
