// File: TableItem.js
// Description: This is a table item component used with the Table Component

import React from 'react'

export default function TableItem({ row, columns, actions, onClick }) {
    return (
        <tr className='table-row' onClick={onClick ? onClick : null}>
            { columns.map((col, index) => {
                return <td key={index}>{row[col.name]}</td>
            }) }
            { actions ? <td><div className='actions'>{actions.map((action, index) => {
                return <div key={index}><button className={action.style} onClick={() => action.action(row)}>{action.icon}</button></div>
            })}</div></td> : null }
        </tr>
    )
}
