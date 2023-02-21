import { DocumentData } from 'firebase/firestore'
import React from 'react'
type Props = {
    message:DocumentData
}

const Message = ({ message }: Props) => {
    const isChatGPT = message.user.name === 'ChatGPT';
    return (
      <div className={`p-5 text-white dark:bg-white dark:text-black ${isChatGPT && "bg-[#434654] dark:border dark:bg-gray-100"}`}>
      <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
          <img src={message.user.avator} alt="" className='h-8 w-8' />
          <p className='pt-1 text-sm'>{message.text}</p>
            </div>
            </div>
  )
}

export default Message