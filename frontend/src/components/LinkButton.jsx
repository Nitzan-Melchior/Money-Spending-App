import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({name, link}) => {
    
  return (
    <nav>
      <Link 
        to={link}
        className="btn btn-outline-primary">
          {name}
      </Link>
    </nav>
  )
}

export default LinkButton