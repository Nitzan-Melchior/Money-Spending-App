import React from 'react'


const CategoryCard = ({title, amount, image}) => {
  return (
    
    <div className="card text-center" style={{width: '18rem', backgroundColor: '#F0F8FF'}}>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <img src={image} alt='Logo' style={{ height: '40px' }}/>
            <div className='mt-2'><strong>${amount}</strong></div>
        </div>
    </div>
  )
}

export default CategoryCard