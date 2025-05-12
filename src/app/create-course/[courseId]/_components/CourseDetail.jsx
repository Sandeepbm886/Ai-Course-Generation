import React from 'react'
import { BsBarChart } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineOndemandVideo } from "react-icons/md";
function CourseDetail({ course }) {
    return (
        <div className='border rounded-xl shadow-sm p-6 mt-3'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                <div className='flex gap-2'>
                    <BsBarChart className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MdOutlineAccessTime className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.["Duration"]}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <IoBookOutline className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No.of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.["No.of Chapters"]}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MdOutlineOndemandVideo className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Video Included</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail