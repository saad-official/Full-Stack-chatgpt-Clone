"use client";
import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';


const NewChat = () => {
    const router = useRouter();
    const { data: session } = useSession();
   
    const createNewChat = async () => {
        const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
            messages: [],
            userId: session?.user?.email!,
            createdAt: serverTimestamp()
        }
        );

        router.push(`/chat/${doc.id}`)
    }


  return (
      <div onClick={createNewChat} className='flex border border-gray-700 items-center ChatRow'>
          <PlusIcon className='h-4 w-4' />
          <p>new chat</p>
    </div>
  )
}

export default NewChat