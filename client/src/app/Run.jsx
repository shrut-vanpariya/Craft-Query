import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chatbody from './Chatbody';
import { useIndex } from '../IndexContext';
import { useEffect } from 'react';
import Avatar from 'react-avatar';
import { useLocation } from 'react-router';
import DynamicTable from './Table';

const Run = () => {
  console.log('Reaching here');
  const { updateUsername } = useIndex();
  const {state} = useLocation(); 

  console.log(state.query);

  const [error, setError] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3001/checksession', {
          method: 'POST',
          headeres: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This line enables sending cookies
        });
        console.log(response);
        const result = await response.json();
        console.log(result);
        if (result.valid === false) {
          navigate('/');
        } else {
          console.log(result.username);
          // setUsername1(result.username);
          updateUsername(result.username);
        }
      } catch (err) {
        console.error('Error during session check:', err.message);
      }
    };

    checkSession();

    
    
  }, []);

  const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);
  
  const handleRun = async () => {
    const response = await fetch("http://localhost:5000/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query: state.query}),
      redirect: "follow"
    })
    
    const data = await response.json();

    console.log(data);

    if(data.error !== undefined) {
      console.log("Error during execution");
      setError(true)
      return
    }
    console.log(data);
    setCols(data.cols)
    setData(data.users)



  }

  
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex contain w-full'>
          <div className='flex-1 h-[800px]  -mb-20 relative'>
            <div className='flex items-center justify-between p-5 text-xl text-gray-500'>
              <p className='-mt-4'>QueryCraft</p>
              <Avatar name='Manav' round size='40px' />
            </div>
            <div className='flex flex-col'>
              <style>
                {`
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Inter', sans-serif;
              --font-sans: 'Inter';
            }
            body {
              font-family: 'Inter', sans-serif;
              --font-sans: 'Inter';
            }
          `}
              </style>
              <header className=' text-white py-4 px-6'>
                <h1 className='text-5xl text-[#3b82f6] font-medium'>SQL Query Runner</h1>
              </header>
              <div className='flex-1 p-3 space-y-4'>
                <div className='w-full flex flex-col items-center space-x-4'>
                  <div className='flex w-full'>
                    <input
                      className='flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1'
                      placeholder='Enter your SQL query'
                      type='text'
                      value={state.query}
                    />
                    <button onClick={handleRun} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                      Run
                    </button>
                  </div>
                  {error && <span  className='bg-red-300 rounded-md p-2 mt-7'> Please, run proper query.</span>}
                </div>
                <div
                  className='rounded-lg border bg-card text-card-foreground shadow-sm overflow-scroll h-[625px]'
                  data-v0-t='card'
                >
                {!error && <DynamicTable TABLE_ROWS={data} TABLE_HEAD={cols}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Run;
