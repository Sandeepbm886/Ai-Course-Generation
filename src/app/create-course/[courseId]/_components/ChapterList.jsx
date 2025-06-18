import React from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";
import EditChapters from './EditChapters';
function ChapterList({course, refreshData, edit=true}) {
  return (
    <div className='mt-3'>
        <h2 className='font-bold text-xl'>Chapters</h2>
        <div className='mt-2'>
            {course?.courseOutput?.["Chapters"]?.map((item,index)=>(
                <div key={index} className='border rounded-lg shadow-sm p-5 mb-2 flex items-center justify-between'>
                <div className='flex gap-5 items-center '>
                    <h2 className='bg-primary text-white p-2 h-10 w-10 flex-none text-center rounded-full '>{index+1}.</h2>
                    <div>
                        <h2 className='font-medium text-lg'>{item["Chapter Name"]}{edit && <EditChapters index={index} course={course} refreshData={() => refreshData(true)} />}</h2>
                        <p className='text-sm text-gray-500'>{item["about"]}</p>
                        <p className='flex gap-2 text-primary'>{item["Duration"]}</p>
                    </div>
                </div>
                <IoMdCheckboxOutline className='text-4xl text-gray-300 flex-none' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList