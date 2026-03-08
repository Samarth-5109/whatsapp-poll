import React from 'react'

function Button({title, variant="bg-green-500"}) {
  return (
    <button className={`border rounded-md text-sm w-full mt-3 py-1 text-amber-50 cursor-pointer ${variant}`}>{title}</button>
  )
}

export default Button