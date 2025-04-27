import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TextFormComp from '../components/TextFormComp'
import Dropdown from '../components/Dropdown'

const Add = () => {
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const categories = ['Travel', 'Restaurants and Nightlife', 'Food and Groceries', 'Bills', 'Leisure', 'Lifestyle', 'Other']

    const handleSubmit = (push) => {
        push.preventDefault();
        if (!amount || !title || !category) {
            alert("Some required fields weren't filled!");
            return;
        }
        fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: parseFloat(amount), title, category})
        }).then(
            res => res.json()
        ).then(() => navigate('/')).catch(
            err => console.error('Error:', err)
        );
    };

  return (
    <div className="container d-flex flex-column align-items-center">
        <form onSubmit={handleSubmit} className='w-50'>
            <TextFormComp 
                type={'number'}
                name={'amount'}
                value={amount}
                text={'Amount'}
                func={setAmount}
            />

            <TextFormComp 
                type={'text'}
                name={'title'}
                value={title}
                text={'Title'}
                func={setTitle}
            />
            <Dropdown 
                list={categories}
                text={'Choose Category'}
                func={setCategory}
                value={category}
            />
            <div><button type='submit' className='btn btn-light mt-4'>Add Expense</button></div>
        </form>
    </div>
  )
}

export default Add