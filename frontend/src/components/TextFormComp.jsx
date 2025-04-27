import React from 'react'

const TextFormComp = ({type, name, text, func, value}) => {
  return (
    <div className="mb-3">
        <label htmlFor={name} className='form-label'>{text}</label>
        <input
            type={type}
            className='form-control'
            id={name}
            value={value}
            onChange={(push) => func(push.target.value)}
        />
    </div>
  )
}

export default TextFormComp