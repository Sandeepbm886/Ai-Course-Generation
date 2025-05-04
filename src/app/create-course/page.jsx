"use client"
import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { GiDiscussion } from "react-icons/gi";
import { IoOptions } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function CreateCourse() {
  const stepperOptions=[{
    id:1,
    name:"Category",
    icon:<PiSquaresFourFill />
  },
  {
    id:2,
    name:"Topic & Desc",
    icon:<GiDiscussion />
  },
  {
    id:3,
    name:"Options",
    icon:<IoOptions />
  }
]
const [activeIndex, setActiveIndex]=useState(0)
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl font-medium text-primary'>Create Course</h2> 
        <div className='flex items-center mt-10'>
          {stepperOptions.map((item,index)=>(
          <div key={item.id} className='flex items-center'>
            <div  className='flex items-center flex-col w-[50px] md:w-[100px] '>
              <div className={`text-2xl bg-gray-200 p-3 rounded-full text-white ${activeIndex>=index && 'bg-primary'}`}>
                {item.icon}
              </div>
              <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
            </div>
            {index!==stepperOptions?.length-1 &&<div className={`w-[50px] h-1 md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex-1>=index && 'bg-primary'}`}></div>}
          </div>
          ))}
        </div>
      </div>
      <div className='px-10 md:px-20 lg:px-44 mt-10'>
      <div className='flex justify-between mt-10'>
        <Button disabled={activeIndex==0} onClick={()=>setActiveIndex(activeIndex-1)}>Prev</Button>
        {activeIndex<2 &&<Button onClick={()=>setActiveIndex(activeIndex+1)}>Next</Button>}
        {activeIndex==2 &&<Button onClick={()=>setActiveIndex(activeIndex+1)}>Generate Course Layout</Button>}
      </div>
      </div>
    </div>
  )
}

export default CreateCourse