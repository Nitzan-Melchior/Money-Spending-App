import React from 'react'


const List = ({list, handleClick}) => {

  return (
    <div className="list-group">
        {list.map((item) => (
            <div key={item.id} className = "list-group-item d-flex justify-content-between align-items-center">
              <strong>${item.amount}</strong>
              <div>
                <strong>{item.title}</strong> ({item.category})  
              </div>
              <button className='btn btn-outline-danger btn-sm' onClick={() => handleClick(item)}>
                Delete Expense
              </button>
            </div>
        ))}
    </div>
  )
}

export default List