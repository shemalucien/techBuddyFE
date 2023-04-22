import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearState, imageUpload, getAllImages } from './imageSlice';

const Image = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  const dispatch = useDispatch();
  const { images, isFetching, isError } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);
  const handleFileInputChange = (event) => {
    // handle file input change if necessary
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    // Only attempt to upload an image if one has been selected and we are not already fetching or displaying an error
    if (selectedFile && !isFetching && !isError) {
      dispatch(imageUpload(selectedFile));
    }
    else {
      dispatch(clearState());
    }
  }, [selectedFile, isFetching, isError, dispatch]);
  return (
    <Fragment>
      <div className={`dark ${darkMode ? 'bg-gray-800' : 'bg-white'} text-${darkMode ? 'white' : 'black'}`}>
        <form onSubmit={handleFileInputChange} encType="multipart/form-data" className='text-center'>
          <input type="file" name="image" onChange={handleFileInputChange}/>
          <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type='submit'>Upload</button>
        </form>
        <div className="py-2">
          <h1 className="text-3xl font-bold text-black text-center">Uploaded Images</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.data && images.data.map((image) => (
              <div className="bg-white rounded-lg shadow-md p-4" key={image._id}>
                <img src={image.imageUrl} alt={image.imageName} className="w-full h-auto rounded-lg" />
                <h1 className="text-2xl font-bold mt-4 text-center">{image.imageName.substring(0, 10)}</h1>
              </div>
            ))}
            {(!images.data || images.data.length === 0) && (
              <p className="text-lg text-gray-500">No images uploaded yet.</p>
            )}
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Image;
