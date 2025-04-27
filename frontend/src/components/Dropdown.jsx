import React from 'react'

const Dropdown = ({list, text, func, value}) => {
  return (
    <div className="dropdown">
        <label htmlFor={text} className='form-label mx-2'>{text + ': '}</label>
        <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {value?value:text}
        </button>
        <ul className="dropdown-menu">
            {list.map((item, index) => (
                <li key={index}>
                    <a 
                        className="dropdown-item"
                        href="#"
                        onClick={(push) => {
                            push.preventDefault();
                            func(item)
                        }}
                        >
                            {item}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Dropdown