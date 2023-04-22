import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const imageUpload = createAsyncThunk(
  'image/imageUpload',
  async (file, thunkAPI) => {
    try {
      if (!file) {
        return thunkAPI.rejectWithValue('No file selected');
      }
      const formData = new FormData();
      formData.append('photo', file);
      // display the content of the formData
      console.log(formData);
      const response = await fetch(
        'http://localhost:5000/api/v1/image/imageUpload',
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

export const getAllImages = createAsyncThunk(
    'image/getAllImages',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/image/getallImages',
                {
                    method: 'GET',
                    headers: {
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

export const imageSlice = createSlice({
    name: 'image',
    initialState: {
      images: [],
    },
    reducers: {
      clearState: (state) => {
        state.images = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(imageUpload.fulfilled, (state, action) => {
          state.images = action.payload;
        })
        .addCase(getAllImages.fulfilled, (state, action) => {
          state.images = action.payload;
        });
    },
  });
  

export const { clearState } = imageSlice.actions;
export const userSelector = (state) => state.image.images;
