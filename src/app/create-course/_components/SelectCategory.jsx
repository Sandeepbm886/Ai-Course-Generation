import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React from 'react'

function SelectCategory() {
  return (
    <div className='grid grid-cols-3 gap-10 px-10 md:px-20'>
        {CategoryList.map((item,index)=>(
            <div key={item.id} className='flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer'>
                <Image src={item.icon} alt={item.name} width={50} height={50}/>
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default SelectCategory