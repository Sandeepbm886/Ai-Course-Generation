"use client";
import React, { use, useEffect, useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../configs/db';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useRouter } from 'next/navigation';
import { CourseList } from '../../../../../configs/schema';
import { TbCopy } from "react-icons/tb";

function FinishScreen({ params }) {
  const unwrappedParams = use(params);
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const router = useRouter();
  
    
    useEffect(() => {
  
      if (unwrappedParams?.courseId && user?.primaryEmailAddress?.emailAddress) {
        GetCourse();
      }
    }, [unwrappedParams, user]);
  
    const GetCourse = async () => {
      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, unwrappedParams.courseId),
              eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
            )
          );
        setCourse(result[0]);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
  return (
    <div className='px-10 md:px-20 lg:px-44'>
      <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats Yours Course Is Ready</h2>
      
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2>Course URL:</h2>
      <h2 className='text-center text-gray-400 border p-2 rounded flex gap-5'>{process.env.NEXT_PUBLIC_DOMAIN_NAME}/course/view/{course?.courseId}
        <TbCopy className='h-5 w-5 cursor-pointer' onClick={async ()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_DOMAIN_NAME+"/course/view/"+course?.courseId)} />
      </h2>
    </div>
  )
}

export default FinishScreen