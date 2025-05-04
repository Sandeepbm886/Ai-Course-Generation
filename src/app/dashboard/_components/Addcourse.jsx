import React from 'react'
import UserNameWrapper from './UserNameWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Addcourse() {
  return (
    <div className='flex justify-between items-center'>
        <div>
            <h2 className='text-2xl font-bold'>Hello, <span><UserNameWrapper/></span></h2>
            <p className='text-sm text-gray-500'>Create new course with AI</p>
        </div>
        <Link href={'/create-course'}>
          <Button className="hover:cursor-pointer">+ Create AI Course</Button>
        </Link>
    </div>
  )
}

export default Addcourse