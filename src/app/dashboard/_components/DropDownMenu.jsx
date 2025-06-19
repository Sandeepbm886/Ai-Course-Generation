import React from 'react'
import { MdDelete } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IoMdOpen } from "react-icons/io";
import Link from 'next/link';

function DropDownMenu({ children, handelOnDelete, course }) {
  const [openAlert,setOpenAlert] = React.useState(false);
  


  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/course/${course.courseId}`} className='no-underline text-black'>
          <DropdownMenuItem >
            <div className='flex items-center gap-1 cursor-pointer'>
              <IoMdOpen />Open
            </div>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={()=> setOpenAlert(true)}>
            <div className='flex items-center gap-1 cursor-pointer'>
              <MdDelete />Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{handelOnDelete(); setOpenAlert(false);}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DropDownMenu