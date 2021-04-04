
import React from 'react'
import './TokenSearchForm.css'
import { FaSearch } from 'react-icons/fa'

export default function TokenSearchForm({onSubmit, onChange, searchData}) {
    return (
        <form onSubmit={onSubmit} className='token-search-form'>
            <FaSearch color='5f5f5f' />
            <div className="token-search-field">
                <label className="token-form-label">Render: </label>
                <input className='search-input' type='email' name='sender' onChange={onChange} placeholder={'sender@sender.com'} value={searchData.sender} />
            </div>
            <div className="token-search-field">
                <label className="token-form-label">Recipient: </label>
                <input className='search-input' type='email' name='recipient' onChange={onChange} placeholder={'recipient@recipient.com'} value={searchData.recipient} />
            </div>
            <button type='submit' className='token-search-btn'>Search</button>
        </form>
    )
}
