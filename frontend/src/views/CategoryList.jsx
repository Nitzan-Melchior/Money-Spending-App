import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import deleteLogic from '../deleteLogic';
import List from '../components/List';
import LinkButton from '../components/LinkButton';

const CategoryList = () => {

    const location = useLocation();
    const content = location.state?.content || '';

    // const [content, setContent] = useState(initialContent);
    const filter = 'Category';
    const [searchedList, setExpenses] = useState(null);
    const handleClick = deleteLogic(setExpenses);

    useEffect (() => {
        fetch('http://localhost:5000/category_search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({filter, content})
        }).then(
            res => res.json()
        ).then(data => {
            console.log("Search data:", data);
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response: " + JSON.stringify(data));}
            setExpenses(data);}).catch(
            err => console.error('Error:', err)
        )
    },[content]);

  return (
    <>
        <header className="w-50 mx-auto text-center"><h3>{content} Expenses</h3></header>
        <div className="w-50 mx-auto text-center pt-2">
        {searchedList === null ? (
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
        searchedList.length === 0 ? (
            <div>No items matched the search!</div>
        ) : (
            <List list={searchedList} handleClick={handleClick} />
        )
        )}
        </div>
        <div className='pt-3 w-50 mx-auto text-center'>
            <LinkButton link='/' name={'Back'}/>
        </div>
    </>
  )
}

export default CategoryList