'use client'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { db } from '../firebase'
import { toast } from 'react-hot-toast';
import ModelSelection from './ModelSelection'
import { AnimatePresence, motion } from "framer-motion";
import useSWR from 'swr';
import Model from './Model'
type Props = {
   chatId:string
}
  
const Chatinput = ({ chatId }: Props) => {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession()
    const [modelOpen, setModelOpen] = useState(false);
    
    const { data: model } = useSWR('model', {
        fallbackData:'text-davinci-003'
    })
    //TODO: useSWR to get modal
    // const modal = "text-davinci-003"

    const sendMessage = async (e:(FormEvent<HTMLFormElement>)) => {
        e.preventDefault();

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt('');

        const message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name,
                avator: session?.user?.image || `https://ui-avators.com/api/name=${session?.user?.name}?`
             }
        }


        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        // Toast Notification
        const notification = toast.loading('chatGPT is thinking')
        await fetch('/api/askQustion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then((res) => {
            toast.success('chatGPT has responded', {
                id: notification
            })
        }).catch(error => console.log('e', error))
    }

    const open = () => setModelOpen(true);
    const close = () => setModelOpen(false);
  return (
      <div className='bg-[rgba(52,53,65,.1)] dark:bg-white pt-12 pb-4 text-gray-400  text-sm'>
          <form onSubmit={sendMessage} className='p-2 space-x-5 flex md:w-[700px]  dark:bg-slate-100 mx-auto shadow-lg  bg-[rgba(64,65,79,.1)]'>
              <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Type Your Message here' className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed  dark:text-black text-gray-300' disabled={!session} />
              <button type='submit' disabled={!prompt || !session} className='bg-[#11A37F] hover:opacity-50 font-bold text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300'>
                  <PaperAirplaneIcon className='h-5 w-5 -rotate-45' />
              </button>
          </form>
          <div className="flex justify-center dark:bg-white mt-4 pt-2 items-center">
          <p className='hidden md:inline text-sm text-gray-400'>
                  ChatGPT Feb 13 Version. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with</p>
                  <div className="md:hidden ">
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                      whileTap={{scale:0.9}}
                    onClick={()=> modelOpen ? close() : open()}
                    className=" flex justify-center items-center px-3 text-center min-h-fit min-w-fit mx-auto my-4  py-2 bg-teal-600 text-white rounded-sm shadow-lg" >
                        Select Model
                    </motion.button>

                    {modelOpen && <Model modelOpen={modelOpen} handleClose={close} />}
                  </div>
          </div>

          <div className='hidden'>
              <ModelSelection />
          </div>
    </div>
  )
}

export default Chatinput