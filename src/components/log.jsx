import React, { useState } from 'react';

export default function Log() {
    const [details, setDetails] = useState({memberId:'', memberName:'', memberType:''});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const updatedDetails = { ...details, [event.target.name] : event.target.value};
        setDetails(updatedDetails);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const apiUrl = 'http://localhost:8090/api/clearing-members/log';

        try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(details),
            });
      
            const responseData = await response.text();
            console.log('Response from server:', responseData);
      
            // Reset the form
            setDetails({ memberId: '', memberName: '', memberType: '' });
          } catch (error) {
            console.error('Error sending POST request:', error);
          } finally {
            setLoading(false);
          }
    }

    return (
        <div className="p-4">
            <h2 className="font-bold text-4xl text-[#2cb957] text-center">Log Clearing Member</h2>
            
            <div className="mt-10 ml-6">
                <form onSubmit={handleFormSubmit}>

                    <div className="flex flex-col sm:flex-row mb-4 w-full">
                        <div className='relative w-full sm:w-3/5 md:w-2/5 h-12 my-2 sm:mr-6 md:mr-24'>
                            <span
                            className={`absolute -top-2 left-3 z-40 text-xs bg-white px-0.5`}>
                            memberId*
                            </span>
                            <input type="text" name='memberId' value={details.memberId} autoComplete="off"
                                className={`h-full w-full p-3 outline-none border rounded border-black`}
                                onChange={handleChange}
                            />
                        </div>
                    </div>   

                    <div className="flex flex-col sm:flex-row mb-4 w-full">
                        <div className='relative w-full sm:w-3/5 md:w-2/5 h-12 my-2 sm:mr-6 md:mr-24'>
                            <span
                            className={`absolute -top-2 left-3 z-40 text-xs bg-white px-0.5`}>
                            memberName*
                            </span>
                            <input type="text" name='memberName' value={details.memberName} autoComplete="off"
                                className={`h-full w-full p-3 outline-none border rounded border-black`}
                                onChange={handleChange}
                            />
                        </div>
                    </div>   

                    <div className="flex flex-col sm:flex-row mb-1 w-full">
                        <div className='relative w-full sm:w-3/5 md:w-2/5 h-12 my-2 sm:mr-6 md:mr-24'>
                            <span
                            className={`absolute -top-2 left-3 z-40 text-xs bg-white px-0.5`}>
                            memberType*
                            </span>
                            <input type="text" name='memberType' value={details.memberType} autoComplete="off"
                                className={`h-full w-full p-3 outline-none border rounded border-black`}
                                onChange={handleChange}
                            />
                        </div>
                    </div>      

                    <div>
                        <button 
                        type="submit" 
                        className='font-bold my-4 px-6 py-2 border border-black rounded-full'
                        disabled={loading}
                        >
                            {loading ? 'Logging....' : 'Log'}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}