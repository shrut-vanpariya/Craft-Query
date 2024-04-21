import React, { useState } from 'react';
import {
  CircleUserRound,
  Compass,
  Lightbulb,
  MonitorPlay,
  Code,
  SendHorizontal,
} from 'lucide-react';
import { useIndex } from '../IndexContext';
const ChatInterface = ({ schema, setSchema }) => {
  const { username } = useIndex();

  const [openSchema, setOpenSchema] = useState(false)

  const handleSubmit = () => {
    setOpenSchema(false)
  }

  return (
    <>
      {' '}
      <div className='my-12 text-5xl font-medium p-5'>
        <p>
          <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>
            Hello, {username}
          </span>
        </p>
        <p>How can I help you today?</p>
      </div>
      {/* <div
        onClick={() => {
          setOpenSchema(true);
        }}
        className='w-1/4 px-5 cursor-pointer  text-white py-2 mb-12 text-lg rounded-md bg-black ml-5 text-center'
      >
        {' '}
        Enter The Schema
      </div>
      {openSchema && (
        <div className='fixed inset-0 flex justify-center items-center z-50 w-screen backdrop-filter backdrop-blur-sm bg-black bg-opacity-50'>
          <div className='flex justify-center w-screen h-screen items-center'>
            <div className='flex flex-col bg-white w-screen rounded-lg shadow-md p-6 h-1/2 max-w-3xl'>
              <h2 className='text-3xl font-medium mb-3 text-gray-90'>
                Enter The Schema
              </h2>
              <textarea
                onChange={(e) => setSchema(e.target.value)}
                value={schema}
                className='w-full h-60 p-3 rounded-md border shadow-gray-100 bg-white shadow-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your schema here...'
              ></textarea>
              <button onClick={handleSubmit} className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                Submit
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div className='grid grid-cols-4 gap-5 p-5 '>
        <div className='h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer shadow-md'>
          <p>Suggest beautiful places to see on an upcoming road trip</p>
          <Compass
            size={35}
            className='p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full'
          />
        </div>
        <div className='h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer shadow-md'>
          <p>What’s the reaction to and impact of autonomous vehicles</p>
          <Lightbulb
            size={35}
            className='p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full'
          />
        </div>
        <div className='h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer shadow-md'>
          <p>Come up with a recipe for an upcoming event</p>
          <MonitorPlay
            size={35}
            className='p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full'
          />
        </div>
        <div className='h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer shadow-md'>
          <p>Evaluate and rank common camera categories</p>
          <Code
            size={35}
            className='p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full shadow-md'
          />
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
