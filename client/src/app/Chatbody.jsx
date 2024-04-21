import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import ChatInterface from './ChatInterface';
import { SendHorizontal } from 'lucide-react';
import UserAiInteraction from './UserAiInteraction';
import { useIndex } from '../IndexContext';
import { useNavigate, useParams } from 'react-router';
const Chatbody = () => {

  const [userMessages, setUserMessages] = useState([]);
  const [aIMessage, setAiMessage] = useState();

  const [history, setHistory] = useState([]);

  const [schema, setSchema] = useState('');
  const [openSchema, setOpenSchema] = useState(false)

  const param = useParams();
  console.log("Param id : ", param.id);

  const navigate = useNavigate();


  const { username } = useIndex(["asddsa"]);

  const handleSubmit = async (e, message) => {
    e.preventDefault();

    if (message.trim() !== '') {
      setUserMessages([...userMessages, message]);
      setHistory(history => [...history, { "role": "user", "content": message }])
    }

    try {
      const response = await fetch("http://localhost:5000/generate_query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, history, schema }),
        redirect: "follow"
      })

      const data = await response.json();
      // console.log(data);
      console.log(data.history);
      setAiMessage(data.message);
      setHistory(history => [...history, { "role": "assistant", "content": data.message }])
      // console.log(userMessages);


      // if(param.id === undefined) {
      //     setTimeout(() => {
      //     setAllHistory(allHistory => [...allHistory, [history]]);
      //     navigate(`/app/chat/${allHistory.length - 1}`)
      //   }, 1000);
      // }


    } catch (error) {
      console.log(error);
    }


  };


  // useEffect(() => {
  //   localStorage.setItem('allHistory', allHistory);
  // }, [allHistory])

  useEffect(() => {
    if (history?.length !== 0) {
      // console.log("History:", JSON.stringify(history));
      localStorage.setItem('history', JSON.stringify(history))
    }
    console.log(history);
  }, [history])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('history')) === null) {
      localStorage.setItem('history', "[]")
    }
    else {
      setHistory(JSON.parse(localStorage.getItem('history')))
    }
    console.log(JSON.parse(localStorage.getItem('history')));
  }, [])

  return (
    <div className='flex-1 min-h-[100vh] pb-[15vh] relative'>
      <div className='flex items-center justify-between p-5 text-xl text-gray-400'>
        <p>Hack-AI</p>
        <div
          onClick={() => {
            setOpenSchema(true);
          }}
          className='h-10 w-64 cursor-pointer flex justify-center items-center  text-white  text-lg rounded-md bg-black text-center'
        >
          {' '}
          Enter The Schema
        </div>
        {openSchema && (
          <div className='fixed inset-0 flex justify-center items-center z-50 w-screen backdrop-filter backdrop-blur-sm bg-opacity-50'>
            <div className='flex justify-center w-screen h-screen items-center'>
              <div className='flex flex-col bg-white w-screen rounded-lg shadow-md p-6 h-1/2 max-w-3xl'>
                <h2 className='text-3xl font-medium mb-3 text-black'>
                  Enter The Schema
                </h2>
                <textarea
                  onChange={(e) => setSchema(e.target.value)}
                  value={schema}
                  className='w-full h-60 p-3 rounded-md border shadow-gray-100 bg-white shadow-lg border-gray-300 text-black dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter your schema here...'
                ></textarea>
                <button onClick={() => setOpenSchema(false)} className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                  Submit
                </button>
              </div>
              {/* <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='absolute top-[14rem] right-[30rem] h-6 w-6 text-white bg-red-600 rounded-full p-0.5'
                            onClick={() => {
                                setOpenSchema(false);
                            }}
                        >
                            <path
                                fill-rule='evenodd'
                                d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                                clip-rule='evenodd'
                            ></path>
                        </svg> */}
            </div>
          </div>
        )}
        <Avatar name={username} round size='50px' />
        
      </div>
      <div className='max-w-[900px] m-auto h-[630px] overflow-y-scroll text-wrap'>
        {(history?.length) ? (
          <UserAiInteraction history={history} input={userMessages} output={aIMessage} />
        ) : (
          <ChatInterface schema={schema} setSchema={setSchema} />
        )}
        <div className='absolute bottom-0 w-full max-w-[900px] px-5 m-auto'>
          <form
            onSubmit={(e) => {
              handleSubmit(e, e.target.elements.message.value);
              e.target.elements.message.value = '';
            }}
          >
            <div className='flex items-center justify-between gap-5 bg-bgSecondaryColor mb-4 py-1  px-5 rounded-full border'>
              <input
                type='text'
                name='message'
                className='flex-1 bg-white border-none outline-none p-2 text-lg text-gray-700'
                placeholder='Enter a prompt here'
              />
              <button type='submit' className='flex cursor-pointer'>
                <SendHorizontal size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbody;
