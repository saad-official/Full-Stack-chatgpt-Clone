import { ChatBubbleOvalLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
type Props = {
    id: string
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection((
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  ));


  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id))
  }, [pathname])

  
  const deleteChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  }

  return (
    <Link href={`/chat/${id}`} className={`ChatRow overflow-y-auto justify-center ${active && 'bg-gray-700/50'}`}>
      <ChatBubbleOvalLeftIcon className='h-5 w-4' />
      <p className='flex-1 hidden md:inline-flex truncate'>
        {messages?.docs[messages?.docs.length-1]?.data().text || 'new Chat'}
      </p>
      <TrashIcon onClick={deleteChat} className='h-5 w-4 hover:text-red-600 text-gray-700'  />
    </Link>
  )
}

export default ChatRow