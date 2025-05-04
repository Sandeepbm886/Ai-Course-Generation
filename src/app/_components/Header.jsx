import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-lg'>
        <Image src={'/logo.svg'} alt={'logo'} width={40} height={50}/>
        <Button>Get Started</Button>
    </div>
  )
}

export default Header
