import { useState } from 'react';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import { useHistory } from 'react-router-dom';
import Image from './images';
import Video from './video';
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  const { username, email } = useSelector(userSelector);
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');

    history.push('/login');
  };

  return (
    <Fragment>
      <div className='dark bg-gray-800 '>
        <div className="flex flex-col items-center justify-center py-2">
          <h1 className="text-3xl font-bold text-white ">Welcome back</h1>
        </div>
        <Image />
        <Video />
        <div className="flex flex-col items-center justify-center  py-2">
          <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
          >
            Log Out
          </button>
        </div>
      </div>
    </Fragment>
  );


};

export default Dashboard;
