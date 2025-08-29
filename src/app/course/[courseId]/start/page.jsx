"use client";
import React, { use, useEffect, useState } from 'react'
import { db } from '../../../../../configs/db';
import { Chapters, CourseList } from '../../../../../configs/schema';
import { and, eq } from 'drizzle-orm';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

function CourseStart({ params }) {
    const unwrappedParams = use(params);
    
    const [course, setCourse] = useState(null); 
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();
    useEffect(() => {
        unwrappedParams && GetCourse();
    }, [unwrappedParams]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, unwrappedParams?.courseId))
        console.log("Course Data:", result);
        setCourse(result[0]);
    }

    const GetContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, course?.courseId)));
        console.log("Chapter Content:", result);
        setChapterContent(result[0]);
    }
    return (
        <div>
            <div className="fixed md:w-72 hidden md:block h-screen overflow-y-auto border-r shadow-sm custom-scrollbar">
                <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.["Course Name"]}</h2>
                <div>
                    {course?.courseOutput?.["Chapters"]?.map((chapter, index) => (
                        <div key={index} className={`cursor-pointer border-b  ${selectedChapter?.["Chapter Name"] == chapter?.["Chapter Name"] ? "bg-purple-100" : ""} flex items-center gap-2 p-3`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetContent(index);
                            }}>
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
        </div>
    )
}

export default CourseStart