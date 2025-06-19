"use client"
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../../configs/db'
import { CourseList } from '../../../../configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import CourseCard from './coursecard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { UserCourseList, setUserCourseList } = useContext(UserCourseListContext)

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      const result = await db.select().from(CourseList)
        .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));
      setCourseList(result);
      setUserCourseList(result);
    } catch (error) {
      console.error("DB error:", error);
    }
  };


  return (
    <div className='mt-10'>
      {courseList.length > 0 && (
        <>
          <h2 className='font-medium text-xl'>My AI Courses</h2>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
            {courseList.map((course, index) => (
              <CourseCard course={course} key={index} refreshData={() => getUserCourses()} explorePage={false} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default UserCourseList