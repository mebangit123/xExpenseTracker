import {Box} from '@mui/material';
import WalletBalance from '../components/Wallet/WalletBalance'
import ExpenseBalance from '../components/Expense/ExpenseBalance'
import ExpenseTransanction from '../components/Transanction/ExpenseTransanction'
import { useEffect, useState } from 'react';
function HomeDup() {
  const [balance, setBalance] = useState(0);
  const [isEdit, setIsEdit] = useState(true);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    console.log('UseEffect 1......')
    let localBalance = localStorage.getItem("balance");
    if (localBalance) {
      // handleBalance(Number(localBalance));
      setBalance(Number(localBalance))
    } else {
      // handleBalance(5000);
      setBalance(Number(5000));
    }
    const expenseItems = JSON.parse(localStorage.getItem("expense"));
    setExpenseList(expenseItems || []);
    setIsMounted(true);
  },[]);
  

  useEffect(() => {
    console.log('UseEffect 3......')
    console.log('expense change.....')    
    if(expenseList.length > 0 || isMounted) { 
      console.log(expenseList);
      localStorage.setItem("expense", JSON.stringify(expenseList));      
    } 
    if (expenseList.length > 0) {
      setExpenseBalance(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    }
    else {
      setExpenseBalance(0);
    }
    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList]);

  const handleBalance = (bal) => {
    // localStorage.setItem('balance', bal);
    setBalance(prevBal => prevBal + bal);    
  }
  
  useEffect(() => {
    if(isMounted) {
      console.log('UseEffect balChange......')
      localStorage.setItem("balance", balance);
    // }
    }            
  },[balance]);

  return (
    <div 
      style={{
        height: '100vh',
        background: '#3B3B3B',
        // paddingTop: 2,
        // padding:  '0 2',
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
      <div style={{
          border: '1px solid #9B9B9B',
          height: '90%',
          mt: 1
        }}
      >
        <div style={{
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
            <ExpenseBalance 
              expenseList={expenseList} 
              expenseBalance={expenseBalance} 
              setExpenseList={setExpenseList} 
              setExpenseBalance={setExpenseBalance} 
              balance={balance} 
              setBalance={setBalance} 
            />
          </div>   
          <div style={{width: '30%'}}>Other content</div>
        </div>
        <h2 style={{
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
        </h2> 
        <div display='flex'>
          <ExpenseTransanction 
            isEdit={isEdit} 
            setIsEdit={setIsEdit}
            expenseList={expenseList} 
            expenseBalance={expenseBalance} 
            setExpenseList={setExpenseList} 
            setExpenseBalance={setExpenseBalance} 
            balance={balance} 
            setBalance={setBalance} 
          />
        </div>       
      </div>       
    </div>
  );
}

export default HomeDup;
