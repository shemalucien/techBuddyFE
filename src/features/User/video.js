import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearState, videoUpload, getAllVideos } from './videoSlice';

const Video = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const dispatch = useDispatch();

  const { videos, isFetching, isError } = useSelector((state) => state.video);

  console.log(videos);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);


  const handleFileInputChange = (event) => {
    // handle file input change if necessary
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // Only attempt to upload an image if one has been selected and we are not already fetching or displaying an error
    if (selectedFile && !isFetching && !isError) {
      dispatch(videoUpload(selectedFile));
    }
    else {
      dispatch(clearState());
    }
  }, [selectedFile, isFetching, isError, dispatch]);

  return (
    <Fragment>
      <div className={`dark ${darkMode ? 'bg-gray-800' : 'bg-white'} text-${darkMode ? 'white' : 'black'}`}>
        <form onSubmit={handleFileInputChange} encType="multipart/form-data" className='text-center'>
          <input type="file" name="video" onChange={handleFileInputChange} />
          <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type='submit'>Upload</button>
        </form>
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
