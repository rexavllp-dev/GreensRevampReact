"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../actions/users";

// set up cookies

const initialState = {
    isAllUsersLoading: false,
    isAllUsersLoaded: false,
    isAllUsersLoadError: false,
    allUsers: [],

    isSingleUserLoading: false,
    isSingleUserLoaded: false,
    isSingleUserLoadError: false,
    singleUser: {},

    isUserCreating: false,
    isUserCreated: false,
    isUserCreateError: false,

    isUserUpdating: false,
    isUserUpdated: false,
    isUserUpdateError: false,

    isCompanyStatusUpdating: false,
    isCompanyStatusUpdated: false,
    isCompanyStatusUpdateError: false,
}


export const getAllUsers = createAsyncThunk('getAllUsers', async ({ data }, thunkAPI) => {
    try {
        const response = await users.getAllUsers()
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getSingleUser = createAsyncThunk('getSingleUser', async (id, thunkAPI) => {
    try {
        const response = await users.getSingleUser(id)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createUserByAdmin = createAsyncThunk('createUserByAdmin', async ({ data }, thunkAPI) => {
    try {
        const response = await users.createUserByAdmin(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUserByAdmin = createAsyncThunk('updateUserByAdmin', async ({ data, id }, thunkAPI) => {
    try {
        const response = await users.updateUserByAdmin(data, id)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateCompanyStatus = createAsyncThunk('updateCompanyStatus', async ({ data, id }, thunkAPI) => {
    try {
        const response = await users.updateCompanyStatus(data, id)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const approveCompany = createAsyncThunk('approveCompany', async ({ id }, thunkAPI) => {
    try {
        const response = await users.approveCompany(id)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const rejectCompany = createAsyncThunk('rejectCompany', async ({ id }, thunkAPI) => {
    try {
        const response = await users.rejectCompany(id)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.isAllUsersLoading = true;
                state.isAllUsersLoaded = false;
                state.isAllUsersLoadError = false;
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isAllUsersLoading = false;
                state.isAllUsersLoaded = true;
                state.isAllUsersLoadError = false;
                state.allUsers = action.payload;
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.isAllUsersLoading = false;
                state.isAllUsersLoaded = false;
                state.isAllUsersLoadError = true;
            })


            .addCase(getSingleUser.pending, (state, action) => {
                state.isSingleUserLoading = true;
                state.isSingleUserLoaded = false;
                state.isAllUsersLoadError = false;
            })

            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.isSingleUserLoading = false;
                state.isSingleUserLoaded = true;
                state.isSingleUserLoadError = false;
                state.singleUser = action.payload;
            })

            .addCase(getSingleUser.rejected, (state, action) => {
                state.isSingleUserLoading = false;
                state.isSingleUserLoaded = false;
                state.isSingleUserLoadError = true;
            })


            .addCase(updateUserByAdmin.pending, (state, action) => {
                state.isUserUpdating = true;
                state.isUserUpdated = false;
                state.isUserUpdateError = false;
            })

            .addCase(updateUserByAdmin.fulfilled, (state, action) => {
                state.isUserUpdating = false;
                state.isUserUpdated = true;
                state.isUserUpdateError = false;
            })

            .addCase(updateUserByAdmin.rejected, (state, action) => {
                state.isUserUpdating = false;
                state.isUserUpdated = false;
                state.isUserUpdateError = true;
            })


            //approve company
            .addCase(approveCompany.pending, (state, action) => {
                state.isCompanyStatusUpdating = true;
                state.isCompanyStatusUpdated = false;
                state.isCompanyStatusUpdateError = false;
            })

            .addCase(approveCompany.fulfilled, (state, action) => {
                state.isCompanyStatusUpdating = false;
                state.isCompanyStatusUpdated = true;
                state.isCompanyStatusUpdateError = false;
            })

            .addCase(approveCompany.rejected, (state, action) => {
                state.isCompanyStatusUpdating = false;
                state.isCompanyStatusUpdated = false;
                state.isCompanyStatusUpdateError = true;
            })

            //reject company
            .addCase(rejectCompany.pending, (state, action) => {
                state.isCompanyStatusUpdating = true;
                state.isCompanyStatusUpdated = false;
                state.isCompanyStatusUpdateError = false;
            })

            .addCase(rejectCompany.fulfilled, (state, action) => {
                state.isCompanyStatusUpdating = false;
                state.isCompanyStatusUpdated = true;
                state.isCompanyStatusUpdateError = false;
            })

            .addCase(rejectCompany.rejected, (state, action) => {
                state.isCompanyStatusUpdating = false;
                state.isCompanyStatusUpdated = false;
                state.isCompanyStatusUpdateError = true;
            })


    }
})


export default userSlice.reducer