import Image from 'next/image'
import React from 'react'
import UserButtonWrapper from './UserButtonWrapper'


function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md items-center'>
        <Image src={'/logo.svg'} alt={'logo'} width={40} height={50}/>
        <UserButtonWrapper/>
    </div>
  )
}

export default Header