import React from 'react'
import { useState, useEffect } from 'react'
import CategoryCard from '../components/CategoryCard';
import LinkButton from '../components/LinkButton';
import Clear from '../components/Clear';
import { Link } from 'react-router-dom';

const MainDisplay = () => {

    const [spending, setSpending] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/display').then(
            res => res.json()
        ).then(
            data => setSpending(data)
        ).catch(error => console.error("Error fetching expenses:", error));
    },[]);

  return (
    <>
        <div className="w-50 mx-auto text-center">
            <div style={{ fontSize: '1.5rem'}}>
                <div>
                    Your total spendings in {spending[0]} {spending[9]}:
                </div>
                <div>
                    <strong>${spending[1]}</strong>
                </div>
            </div>

            <div className='d-flex gap-3 justify-content-center pt-3'>
                <Link to='/categorysearch' state={{content: 'Travel'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Travel'} amount={spending[2]} image={'/images/travel.png'} />
                </Link>
                <Link to='/categorysearch' state={{content: 'Restaurants and Nightlife'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Restaurants and Nightlife'} amount={spending[3]} image={'/images/rest.png'} />
                </Link>
                <Link to='/categorysearch' state={{content: 'Food and Groceries'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Food and Groceries'} amount={spending[4]} image={'/images/food.png'} />
                </Link>
                <Link to='/categorysearch' state={{content: 'Bills'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Bills'} amount={spending[5]} image={'/images/bills.png'} />
                </Link>
            </div>
            <div className='d-flex gap-3 justify-content-center pt-3'>
                <Link to='/categorysearch' state={{content: 'Leisure'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Leisure'} amount={spending[6]} image={'/images/leis.png'} />
                </Link>
                <Link to='/categorysearch' state={{content: 'Lifestyle'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Lifestyle'} amount={spending[7]} image={'/images/lifestyle.png'} />
                </Link>
                <Link to='/categorysearch' state={{content: 'Other'}} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <CategoryCard title={'Other'} amount={spending[8]} image={'/images/other.png'} />
                </Link>
            </div>

            <div className='d-flex gap-3 justify-content-center pt-3'>
                <LinkButton name='Add Expense' link='/add' />
                <LinkButton name='Delete Expense' link='/delete' />
                <LinkButton name='Search Expense' link='/search' />
                <LinkButton name='Track Your Expenses' link='/track' />
                <Clear />
            </div>
        </div>
    </>
  )
}

export default MainDisplay