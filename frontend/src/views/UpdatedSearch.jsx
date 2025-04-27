import React from 'react'
import { useState, useEffect } from 'react'
import Dropdown from '../components/Dropdown'
import TextFormComp from '../components/TextFormComp'
import List from '../components/List'
import deleteLogic from '../deleteLogic'
import { useLocation } from 'react-router'

const Search = () => {

    const location = useLocation();
    const initialFilter = location.state?.filter || '';
    const initialContent = location.state?.content || '';

    const [filter, setFilter] = useState(initialFilter);
    const [content, setContent] = useState(initialContent);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [searchedList, setExpenses] = useState(null);

    const filterList = ['Title', 'Category', 'Date'];
    const categories = ['Travel', 'Restaurants and Nightlife', 'Food and Groceries', 'Bills', 'Leisure', 'Lifestyle', 'Other'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = ['2025', '2024', '2023', '2022', '2021'];
    const handleClick = deleteLogic(setExpenses)

    const displayDate = () => {
        return (
            <>
                <div className='mt-2'>
                    <Dropdown 
                        list={months}
                        text={'Month'}
                        func={setMonth}
                        value={month}
                    />
                </div>
                <div className='mt-2'>
                    <Dropdown 
                        list={years}
                        text={'Year'}
                        func={setYear}
                        value={year}
                    />
                </div>
            </>
        )
    }

    const displayContent = () => {
        return filter === 'Title' ? 
        <TextFormComp 
        type={'text'}
        name={'content'}
        value={content}
        text={'Title'}
        func={setContent}
        /> : <Dropdown 
            list={categories}
            text={'Choose Category'}
            func={setContent}
            value={content}
        />
    }

    const newSearch = () => {
        setContent('');
        setFilter('');
        setMonth('');
        setYear('');
        setExpenses(null);
    }

    const displaySubmitButton = () => {
        return <button type='submit' className='btn btn-light mt-4'>Search Expenses</button>
    }

    useEffect(() => {
        setContent('');
        setMonth('');
        setYear('');
    }, [filter])

    const handleSearch = (push) => {
        push.preventDefault();
        console.log("starting submit");
        fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({filter, content, month, year})
        }).then(
            res => res.json()
        ).then(data => {
            console.log("Search data:", data);
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response: " + JSON.stringify(data));}
            setExpenses(data);}).catch(
            err => console.error('Error:', err)
        )
    }

    const formOrList = () => {
        if (searchedList === null) {
            return (
                <form onSubmit={handleSearch} className='w-50'>
                    <Dropdown 
                        list={filterList}
                        text={"Filter by"}
                        func={setFilter}
                        value={filter}
                    />
                    <div className='mt-2'>{filter && filter !== 'Date' && displayContent()}</div>
                    <div className='mt-2'>{filter && filter === 'Date' && displayDate()}</div>
                    <div>{((filter && content) || (filter && month && year)) && displaySubmitButton()}</div>
                </form>
            )
        }
        else {
            return (
                <>
                    <div className="w-50 mx-auto text-center pt-2">{searchedList.length === 0?'No items matched the search!':<List list={searchedList} handleClick={handleClick}/>}</div>
                    <button type="button" className="btn btn-outline-primary mt-3" onClick={newSearch}>New Search</button>
                </>
            )
        }
    }

  return (
    <div className="container d-flex flex-column align-items-center">
        {formOrList()}
    </div>
  )
}

export default Search