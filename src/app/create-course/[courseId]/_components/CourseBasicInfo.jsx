import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
import EditCourseBasicInfo from './EditCourseBasicInfo';

function CourseBasicInfo({ course, refreshData }) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className='font-bold text-3xl'>{course?.courseOutput?.["Course Name"]}<EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)} /></h2>
          <p className='text-sm text-gray-400'>{course?.courseOutput?.["Description"]}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><BiSolidCategory />{course?.category}</h2>
          <Button className='w-full mt-5'>Start</Button>
          
        </div>
        <div>
            <Image src={'/placeholder.png'} alt={'placeholder'} width={300} height={300} className='w-full rounded-xl'/>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
