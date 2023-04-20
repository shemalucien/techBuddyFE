import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const videoUpload = createAsyncThunk(
    'video/upload',
    async (file, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/video/videoUpload',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: file,
                    
                }
            );
            let data = await response.json();
            console.log('data', data);
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAllVideos = createAsyncThunk(
    'video/getAllVideos',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/video/getallVideos',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            console.log('data', data);
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
      videos: [],
    },
    reducers: {
      clearState: (state) => {
        state.videos = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(videoUpload.fulfilled, (state, action) => {
          state.videos = action.payload;
        })
        .addCase(getAllVideos.fulfilled, (state, action) => {
          state.videos = action.payload;
        });
    },
  });
  

export const { clearState } = videoSlice.actions;
export const userSelector = (state) => state.video.videos;
