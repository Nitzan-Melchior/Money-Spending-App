import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TextFormComp from '../components/TextFormComp'

const Delete = () => {

    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (push) => {
        push.preventDefault();
      
        if (!title) {
          alert("Please provide an expense to delete!");
          return;
        }
      
        fetch('http://localhost:5000/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title })
        }).then((res) => {
            if (!res.ok) {
              // If the response isn't OK, parse the error message and throw an error.
              return res.json().then((errorData) => {
                throw new Error(errorData["no entry with the title provided"] || "Expense not found");
              });
            }
            return res.json();
          }).then((data) => {
            // Expense was deleted successfully; navigate to the main page.
            navigate('/');
          })
          .catch((err) => {
            // Display error message to the user.
            alert("Please provide an expense that was previously entered!");
            console.error('Error:', err);
          });
      };
      

  return (
    <div className="container d-flex flex-column align-items-center">
        <form onSubmit={handleSubmit}>
            <TextFormComp 
                type={'text'}
                name={'title'}
                value={title}
                text={'Title'}
                func={setTitle}
            />
            <div><button type='submit' className='btn btn-light mt-2'>Delete Expense</button></div>
        </form>
    </div>
  )
}

export default Delete