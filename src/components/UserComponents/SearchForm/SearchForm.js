// File: SearchForm.js
// Description: This file contains search form component

import React from 'react'
import './SearchForm.css'
import { FaSearch } from 'react-icons/fa'

export default function SearchForm({placeholder, onSubmit, onChange, searchData}) {
    return (
        <form onSubmit={onSubmit} className='search-form'>
            <FaSearch color='5f5f5f' />
            <input className='search-input' type='email' name='email' onChange={onChange} placeholder={placeholder} value={searchData} required />
            <button type='submit' className='search-btn'>Search</button>
        </form>
    )
}
