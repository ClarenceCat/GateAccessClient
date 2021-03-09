import React from 'react'
import './Modal.css'

export default function Modal({children, setModalOpen}) {

    function backdropClick(e){
        if(e.target.classList.contains('backdrop')){
            setModalOpen(false)
        }
    }

    return (
        <div className='backdrop' onClick={backdropClick}>
            <div className='modal-content'>
            <div className='modal-head'>
                <p onClick={() => setModalOpen(false)}>X</p>
            </div>
                {children}
            </div>
        </div>
    )
}
