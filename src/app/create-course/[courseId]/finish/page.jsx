"use client";
import React, { use, useEffect, useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../configs/db';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useRouter } from 'next/navigation';
import { CourseList } from '../../../../../configs/schema';
import { TbCopy } from "react-icons/tb";
import Link from 'next/link';

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
      <h2>Start Learning:</h2>
      <Link href={`/course/${course?.courseId}`} className='flex items-center gap-2 text-primary font-medium'>
      <h2 className='text-center text-gray-400 border p-2 rounded flex gap-5'>Click Here
      </h2>
      </Link>
    </div>
  )
}

export default FinishScreen