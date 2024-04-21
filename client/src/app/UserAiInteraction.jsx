import React, { useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import '../../public/scroll.css';
import { useIndex } from '../IndexContext';
import { useNavigate } from 'react-router';
const UserAiInteraction = ({history}) => {


  const bottomRef = useRef(null);
  const { username } = useIndex();
  const navigate=useNavigate();

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className='flex-1 p-4  w-[800px]'>
      {history?.map((message, index) => (
        <>
          <div key={index} className='flex items-center space-x-4 mb-4'>
            {
              ( message.role === 'user') 
              ? 
              <>
                {/* <Avatar name={username} round size='50px' /> */}
                
                <div className='flex w-12 h-12 items-center justify-center border-gray-500 p-1 border rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {/* <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="" /> */}
                </div>
                <div className='items-center'>
                  <div className='text-md rounded-md px-1'>{message.content}</div>
                </div>
              </> 
              : 
              <>
                <div className='flex w-12 h-12 items-center justify-center border-gray-500 p-1 border rounded-full text-white'>
                  <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="" />
                </div>
              <div className='text-md rounded-md p-3 w-[700px] border'>
                <p className='break-words w-full mt-5'>
                  {message.content} 
                </p>

                <button onClick={()=>{
                  navigate('/app/run', {state:{query:message.content}})
                }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 ml-auto'>
                  Execute
                </button>
              </div>

              </>
            }
          </div>

          {/* <div className='flex  items-start space-x-4 mb-4'>
            <div className='flex w-[10rem] h-[3rem] px-[18px] items-center justify-center rounded-full bg-green-700 text-white'>
              AI
            </div>
            <div>
              <div className='text-md rounded-md p-3 max-w-[800px] border'>
                <p className='break-words w-full'>Hello, this is response from AI </p>
                <p className='break-words w-full mt-5'>
                  {output}
                </p>

                <button onClick={()=>{
                  navigate('/app/run')
                }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 ml-auto'>
                  Execute
                </button>
              </div>
            </div>
          </div> */}
        </>
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default UserAiInteraction;
