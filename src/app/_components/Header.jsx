import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-lg'>
        <Image src={'/logo.svg'} alt={'logo'} width={40} height={50}/>
        <Link href={"/dashboard"}><Button>Goto Dashboard</Button></Link>
    </div>
  )
}

export default Header
