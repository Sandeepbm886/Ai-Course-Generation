import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden' // install if needed
import Image from 'next/image'

function Loader({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <VisuallyHidden>Loading dialog</VisuallyHidden>
          </AlertDialogTitle>
          <div className='flex flex-col items-center py-10'>
            <Image src={'/loader.gif'} width={100} height={100} alt='loader' />
            <h2 className='text-lg font-semibold mt-4'>Fasten your seatbelt</h2>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Loader
