"use client";
import React, { use, useEffect, useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { Chapters, CourseList } from '../../../../configs/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../configs/db';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateCourseContent } from '../../../../configs/AiModel';
import Loader from '../_components/Loader';
import getVideos from '../../../../configs/Services';
import { useRouter } from 'next/navigation';

function CourseLayout({ params }) {
  const unwrappedParams = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const GenerateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.["Chapters"];
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `
                      Explain the concept in Detail on Topic: ${course?.courseOutput?.["Topic"]}, Chapter: ${chapter?.["Chapter Name"]}, 
                      in JSON Format as a list of objects. Each object must have:
                      - title
                      - explanation (detailed)
                      - Code Example (enclosed in <precode> tags if applicable).
                      Only return valid JSON.
                      `;


      if (index == 0) {
        try {
          // Generate video url
          let videoId = '';
          getVideos(course?.courseOutput?.["Topic"] + ':' + chapter?.["Chapter Name"]).then(resp => {
            console.log(resp);
            videoId = resp[0]?.id?.videoId;
          })
          const result = await GenerateCourseContent(PROMPT);
          console.log(JSON.parse(result));

          //Save Chapter content + videoId to database
          await db.insert(Chapters).values({
            courseId: course?.courseId,
            chapterId: index,
            content: JSON.parse(result),
            videoId: videoId
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.error("Error generating content:", e);
        }
        await db.update(CourseList).set({
          publish: 'Yes',
        })
        router.replace(`/create-course/${course?.courseId}/finish`);
      }
    })
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      <Loader loading={loading} />
      {/* basic info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course detail */}
      <CourseDetail course={course} />
      {/* list of lession */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button onClick={GenerateChapterContent} className="my-10">Generate Course Content</Button>
    </div>
  );
}

export default CourseLayout;
