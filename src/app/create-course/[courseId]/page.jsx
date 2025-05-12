"use client";
import React, { use, useEffect, useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { CourseList } from '../../../../configs/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../configs/db';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';

function CourseLayout({ params }) {
  const unwrappedParams = use(params); 
  const { user } = useUser();
  const[course,setCourse]=useState([]);

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
      console.log(result);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  return (
  <div className='mt-10 px-7 md:px-20 lg:px-44'>
    <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
    {/* basic info */}
    <CourseBasicInfo course={course}/>
    {/* Course detail */}
    <CourseDetail course={course}/>
    {/* list of lession */}
    <ChapterList course={course}/>
  </div>
  );
}

export default CourseLayout;
