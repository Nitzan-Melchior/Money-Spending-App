// import {useState} from 'react'

const deleteLogic = (setExpenses) => {

    const handleClick = (push) => {
        fetch('http://localhost:5000/delete', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title: push.title})
        }).then(
          res => res.json()
        ).then(data => {
            setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== push.id));
        }).catch((err) => {
          console.log('Error', err)
        });
      };

  return handleClick;
}

export default deleteLogic