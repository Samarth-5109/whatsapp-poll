import React from 'react'
import { CarTaxiFront } from 'lucide-react';


function Navbar() {
  return (
    <nav className='flex gap-1 py-2 pl-[20%] shadow-xl font-medium'>Taxi Poll Bot <span><CarTaxiFront color='green'/></span></nav>
  )
}

export default Navbar