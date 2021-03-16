// File: Table.js
// Description: This file contains the Table component, used to display data in a table
import React from 'react'
import TableItem from './TableItem'
import './Table.css'

export default function Table({columns, data, actions}) {

    return (
        <table className='table'>
            <thead className='table-head'>
                <tr>
                    {/* Loop through the columns and set up the headers */}
                    {columns.map((col, index) => {
                        return <td key={index} style={col.style? col.style : null}>{col.headerName}</td>
                    })}
                    { actions ? <td className='actions'></td> : null }
                </tr>
            </thead>
            <tbody className='table-body'>
                {data.map((row, index) => {
                    return <TableItem key={index} row={row} columns={columns} actions={actions} />
                })}
            </tbody>
        </table>
    )
}
