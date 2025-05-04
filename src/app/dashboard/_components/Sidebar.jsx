"use client"
import React from 'react'
import Image from 'next/image'
import { GoHome} from "react-icons/go";
import { FaWpexplorer } from "react-icons/fa";
import { GiUpgrade } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

function Sidebar() {
    const path=usePathname()
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<GoHome/>,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Explore',
            icon:<FaWpexplorer/>,
            path:'/dashboard/explore'
        },
        {
            id:3,
            name:'Upgrade',
            icon:<GiUpgrade/>,
            path:'/dashboard/upgrade'
        },
        {
            id:4,
            name:'Logout',
            icon:<HiLogout/>,
            path:'/dashboard/logout'
        }
    ]
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={'/logo.svg'} alt={'logo'} width={40} height={50} className='mb-5'/>
        <hr className='p-5' />
        <ul>
            {Menu.map((item,index)=>(
                <Link href={item.path} key={item.id}>
                <div  className={`flex gap-2 items-center text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-2 ${item.path==path &&'bg-gray-100 text-black'}`}>
                    <div className='text-2xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={33}/>
            <h2 className='text-sm my-2'>3 Out of 5 Course Created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade to Pro</h2>
        </div>
    </div>
  )
}

export default Sidebar