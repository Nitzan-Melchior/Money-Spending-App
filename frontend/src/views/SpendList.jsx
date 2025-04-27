import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import List from '../components/List';
import deleteLogic from '../deleteLogic';



const SpendList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
            })
            .then(data => setExpenses(data))
            .catch(error => console.error("Error fetching expenses:", error));
        }, []);
    
    const handleClick = deleteLogic(setExpenses)

  return (
    <>
        <header className="w-50 mx-auto text-center"><h3>All Expenses</h3></header>
        <div className="w-50 mx-auto text-center pt-2">
            <List list={expenses} handleClick={handleClick}/>
        </div>
    </>
    
    
  )
}

export default SpendList