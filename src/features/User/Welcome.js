import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Welcome = () => {
    const history = useHistory();
    return (
        <Fragment>
            <div className='flex flex-col items-center justify-center  py-2 '>
                <h1>Welcome to techBuddy</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded' onClick={() => history.push('/login')}>Login</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded' onClick={() => history.push('/signup')}>Signup</button>
            </div>
        </Fragment>
    );
}
export default Welcome;