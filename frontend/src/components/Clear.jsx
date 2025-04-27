import React from 'react'

const Clear = () => {
    const handleClear = (push) => {
        push.preventDefault();
        const first = window.confirm("You will be deleting all expenses. Are you sure you want to proceed?");
        const second = first && window.confirm("No going back after this!")
        if (second) {
            fetch('http://localhost:5000/clear', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            }).then(res => res.json()).then(data => window.location.reload()).catch(
                err => console.error('Error:', err)
            )
        }
    }
  return (
    <button 
        type="button" 
        class="btn btn-outline-danger"
        onClick={handleClear}>
            Clear
    </button>
  )
}

export default Clear