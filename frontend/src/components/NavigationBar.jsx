import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../logo_circular_final.svg'

const NavigationBar = () => {

    const currURL = useLocation();

    const boldifyPath = (url, text) => {
        if (url === currURL.pathname) {
            return (
                <Link class="navbar-brand active" to={url}><strong>{text}</strong></Link>
            )
        }
        else {
            return (
                <Link className="nav-link active" to={url}>{text}</Link>
            )
        }
    };
    

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid me-auto">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav w-100 d-flex justify-content-evenly align-items-center mb-2 mb-lg-0">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt='Logo' style={{ height: '40px' }}/>
                    </Link>
                    <div className="vr" style={{ height: '50x', width: '3px', backgroundColor: '#00008B'}}></div>
                    <li className="nav-item">
                        {boldifyPath('/add', 'Add Expense')}
                    </li>
                    <div className="vr" style={{ height: '50px' }}></div>
                    <li className="nav-item">
                        {boldifyPath('/delete', 'Delete Expense')}
                    </li>
                    <div className="vr" style={{ height: '50px' }}></div>
                    <li className="nav-item">
                        {boldifyPath('/search', 'Search Expense')}
                    </li>
                    <div className="vr" style={{ height: '50px' }}></div>
                    <li className="nav-item">
                        {boldifyPath('/track', 'Track Expenses')}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavigationBar