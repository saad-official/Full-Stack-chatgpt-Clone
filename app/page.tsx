import React from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
function HomePage() {
  return (
      <div className='text-white flex flex-col items-center justify-center h-screen px-2 dark:bg-white'>
          <h1 className='text-5xl font-bold mb-20 dark:text-gray-600'>ChatGPT</h1>

          <div className="flex  space-x-2 text-center">
              <div className="">
                  <div className="flex flex-col items-center justify-center mb-5">
                  <SunIcon className="h-6 w-6 dark:text-black"/>
                      <h2 className='dark:text-black font-medium'>Example</h2>
                  </div> 
                  
                  <div className="space-y-3 ">
                      <p className='infoText'>Explain Something To Me</p>
                      <p className='infoText'>What is the difference between cat and dog </p>
                      <p className='infoText'>What is the Color of sun</p>
                  </div>
              </div>

              <div className="">
                  <div className="flex flex-col items-center justify-center mb-5">
                    
                  <BoltIcon className="h-6 w-6 dark:text-black"/>
                      <h2 className='dark:text-black font-medium'>Capibilities</h2>
                  </div> 
                  
                  <div className="space-y-3">
                      <p className='infoText'>Change the Chatgpt Model to use</p>
                      <p className='infoText'>Message are stored in Firebase's Firestore </p>
                      <p className='infoText'>Notification when Chatgpt thinking</p>
                  </div>
              </div>

              <div className="">
                  <div className="flex flex-col items-center justify-center mb-5">
                      {/* Sun ICon */}
                      <ExclamationTriangleIcon className="h-6 w-6 dark:text-black"/>
                      <h2 className='dark:text-black font-medium'>Example</h2>
                  </div> 
                  
                  <div className="space-y-3">
                      <p className='infoText'>Explain Something To Me</p>
                      <p className='infoText'>What is the difference between cat and dog </p>
                      <p className='infoText'>What is the Color of sun</p>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default HomePage