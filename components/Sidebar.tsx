'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from 'next-auth/react';
import NewChat from './NewChat'
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import Model from './Model';
import DarkModeButton from './DarkModeButton';
import { ArrowRightOnRectangleIcon, ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const { data: session } = useSession();
    const [modelOpen, setModelOpen] = useState(false);
    const [chats, loading, error] = useCollection(
        session &&  query(collection(db, "users", session.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
        )
    )
    const open = () => setModelOpen(true);
    const close = () => setModelOpen(false);

  return (
      <div className='p-2 flex flex-col h-screen'>
          <div className="flex-1">
             
              <div>
                  {/* New Chat */}
                  <NewChat />
                  <div>
                      {/* Modal Selection */}
                      {/* <ModelSelection /> */}
                  </div>

                  <div className="hidden sm:inline ">
                    
                      <motion.button
                          whileHover={{ scale: 1.1 }}
                        whileTap={{scale:0.9}}
                      onClick={()=> modelOpen ? close() : open()}
                      className=" flex justify-center items-center px-3 text-center min-h-fit min-w-fit mx-auto my-4  py-2 bg-teal-600 text-white rounded-sm shadow-lg" >
                          Select Model
                      </motion.button>

                      {modelOpen && <Model modelOpen={modelOpen} handleClose={close} />}
                    </div>

                  <div className='flex flex-col space-y-2 my-2'>
                      
                      {loading && (
                          <div className="animate-pulse text-center text-white">
                              <p>loading....</p>
                          </div>
                 )}

                  {/* Map through the chat rows */}
                  {chats?.docs.map(chat => (
                      <ChatRow key={chat.id} id={chat.id} />
                  ))}
                      </div>
              </div>
          </div>


          <hr className='border border-gray-600' />
          <div className="flex-col hidden md:flex space-y-2 mt-2">
              <div className="text-white flex space-x-3 items-center hover:bg-[rgba(127,129,136,0.1)] p-3 cursor-pointer">
              <ArrowTopRightOnSquareIcon className='h-4 w-4' />
                  <p className='text-sm'>Updates & FAQ</p>
                  
              </div>

              <div className="text-white flex p-3 cursor-pointer  items-center hover:bg-[rgba(127,129,136,0.1)]">
              <DarkModeButton />
              </div>
              {session && (
                  <div className="text-white flex space-x-3 items-center hover:bg-[rgba(127,129,136,0.1)] p-3 cursor-pointer" onClick={() => signOut()}>
                      <ArrowRightOnRectangleIcon className='h-5 w-5' />
                      <p className='text-sm'>Logout</p>
                  </div>
              )}
              </div>
      </div>
  )
}

export default Sidebar