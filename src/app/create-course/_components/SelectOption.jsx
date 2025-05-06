import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'


function SelectOption() {
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2'>
                <div>
                    <label className='text-sm'>Difficulty Level</label>

                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Pro">Pro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Course Duration</label>

                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="1 Hours">1 Hours</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Add Video</label>

                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>No.of Chapters</label>
                    <Input type='number'/>
                </div>
            </div>
        </div>
    )
}

export default SelectOption