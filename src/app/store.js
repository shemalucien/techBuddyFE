import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { imageSlice } from '../features/User/imageSlice';
import { videoSlice } from '../features/User/videoSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    image: imageSlice.reducer,
    video: videoSlice.reducer
  },
});
