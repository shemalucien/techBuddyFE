import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearState, videoUpload,getAllVideos } from './videoSlice';

const Video = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [files, setFiles] = useState([]);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const dispatch = useDispatch();

  function handleFileUpload(event) {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    setFiles([...files, ...filesArray]);
    filesArray.forEach((file) => {
      dispatch(videoUpload(file));
    });
  }

  const { videos, isFetching, isError } = useSelector((state) => state.video);

  console.log(videos);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  useEffect(() => {
    if (!isFetching && !isError) {
      setFiles([]);
    }
    return () => {
      dispatch(clearState());
    };
  }, [isFetching, isError, dispatch]);

  return (
    <Fragment>
    <div className={`dark ${darkMode ? 'bg-gray-800' : 'bg-white'} text-${darkMode ? 'white' : 'black'}`}>
  <div className="flex flex-col items-center justify-center py-2">
    <label htmlFor="file-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
      Upload Video
    </label>
    <input type="file" id="file-upload" onChange={handleFileUpload} />
  </div>
  <div className="flex flex-col items-center justify-center py-2">
    <h1 className='text-3xl font-bold text-black'>Uploaded Videos</h1>
    {videos.data && videos.data.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.data.map((video) => (
          <div className="bg-white rounded-lg shadow-md p-4" key={video._id}>
            <video src={video.videoUrl} alt={video.videoName} className="w-full h-auto rounded-lg" controls />
            <h1 className='text-2xl font-bold mt-4'>{video.videoName.substring(0, 10)}</h1>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-lg text-gray-500">No videos uploaded yet.</p>
    )}
  </div>
</div>

    </Fragment>
  );
};

export default Video;
