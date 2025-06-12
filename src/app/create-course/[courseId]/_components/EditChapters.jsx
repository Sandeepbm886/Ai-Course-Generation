"use client";
import { useEffect, useState } from 'react';
import React from 'react'
import { FiEdit } from "react-icons/fi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CourseList } from '../../../../../configs/schema';
import { db } from '../../../../../configs/db';
import { eq } from 'drizzle-orm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
function EditChapters({ index, course, refreshData }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        if (course?.courseOutput) {
            setName(course.courseOutput.Chapters[index]?.["Chapter Name"]);
            setDescription(course.courseOutput.Chapters[index]?.["about"]);
        }
    }, [course]);
    const onUdateHandeler = async () => {
        course.courseOutput.Chapters[index]["Chapter Name"] = name;
        course.courseOutput.Chapters[index]["about"] = description;
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList.id, course.id)).returning({ id: CourseList.id });
        refreshData(true)
    }

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer"><FiEdit /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter Title & Description</DialogTitle>
                    <div className='mt-3'>
                        <label htmlFor="title">Course Title</label>
                        <Input id='title' defaultValue={course?.courseOutput?.Chapters[index]?.["Chapter Name"]} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description">About</label>
                        <Textarea id='description' defaultValue={course?.courseOutput?.Chapters[index]?.["about"]} onChange={(e) => setDescription(e.target.value)} />
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

export default EditChapters