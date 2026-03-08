import React from 'react'

function Card({title, children}) {
  return (
    <div className='m-3 shadow-md rounded-md p-2'>
        <h3 className='text-xs font-bold text-gray-800'>
            {title}
        </h3>
        <div className='card-content'>
            {children}
        </div>
    </div>
  )
}

export default Card