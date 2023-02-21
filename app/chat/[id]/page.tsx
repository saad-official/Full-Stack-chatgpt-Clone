import React from 'react'
import Chat from '../../../components/Chat'
import Chatinput from '../../../components/Chatinput'

type Props = {
  params: {
    id:string,
  }
}

const page = ({ params: { id }}:Props) => {
  return (
    <div className='flex flex-col h-screen  overflow-hidden'>
      {/* chat */}
      <Chat chatId={id} />
      <Chatinput chatId={id} />
      {/* chat input */}
    </div>
  )
}

export default page