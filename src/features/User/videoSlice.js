import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const videoUpload = createAsyncThunk(
    'video/upload',
    async (file, thunkAPI) => {
        try {
            if (!file) {
                return thunkAPI.rejectWithValue('No file selected');
            }
            const formData = new FormData();
            formData.append('video', file);
            // display the content of the formData
            const response = await fetch(
                'http://localhost:5000/api/v1/video/videoUpload',
                {
                    method: 'POST',
                    body: formData,

                }
            );
            let data = await response.json();
            console.log('data', data);
            if (response.status === 200) {
                const filePath = data.filePath;
                // Return the file path as the result of the async thunk
                return filePath;
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
