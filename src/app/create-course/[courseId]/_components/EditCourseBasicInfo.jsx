"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FiEdit } from "react-icons/fi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CourseList } from '../../../../../configs/schema';
import { db } from '../../../../../configs/db';
import { eq } from 'drizzle-orm';
function EditCourseBasicInfo({course, refreshData}) {
    const[name,setName]=useState();
    const[description,setDescription]=useState();
    useEffect(() => {
    if (course?.courseOutput) {
        setName(course.courseOutput["Course Name"]);
        setDescription(course.courseOutput["Description"]);
    }
    }, [course]);

    const onUdateHandeler=async()=>{
        course.courseOutput["Course Name"]=name;
        course.courseOutput["Description"]=description;
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList.id, course.id)).returning({id:CourseList.id});
        refreshData(true)
    }
    return (
        <Dialog>
            <DialogTrigger className='cursor-pointer'><FiEdit /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    
                        <div className='mt-3'>
                            <label htmlFor="title">Course Title</label>
                            <Input id='title' defaultValue={course?.courseOutput?.["Course Name"]} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Textarea id='description' defaultValue={course?.courseOutput?.["Description"]} onChange={(e)=>setDescription(e.target.value)} />
                        </div>
                    
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onUdateHandeler}>Update</Button>
                    </DialogClose>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditCourseBasicInfo