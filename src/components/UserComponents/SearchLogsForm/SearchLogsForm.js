
import React from 'react'
import './SearchLogsForm.css'
import { FaSearch } from 'react-icons/fa'

export default function SearchLogsForm({onSubmit, onChange, searchData}) {
    return (
        <form onSubmit={onSubmit} className='log-search-form'>
            <FaSearch color='5f5f5f' />
            <div className="log-search-field">
                <label className="log-form-label">Render: </label>
                <input className='search-input' type='email' name='actor' onChange={onChange} placeholder={'actor@actor.com'} value={searchData.actor} required />
            </div>
            <button type='submit' className='log-search-btn'>Search</button>
        </form>
    )
}
