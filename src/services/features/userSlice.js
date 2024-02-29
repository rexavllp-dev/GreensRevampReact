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

    isUserAddressLoading: false,
    isUserAddressLoaded: false,
    isUserAddressLoadError: false,
    userAddress: [],

    isUserAddressCreating: false,
    isUserAddressCreated: false,
    isUserAddressCreateError: false,

    isUserAddressUpdating: false,
    isUserAddressUpdated: false,
    isUserAddressUpdateError: false,
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

export const getAddressByUser = createAsyncThunk('getAddressByUser', async ({ }, thunkAPI) => {
    try {
        const response = await users.getAddressByUser()
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createUserAddress = createAsyncThunk('createUserAddress', async ({ data }, thunkAPI) => {
    try {
        const response = await users.createUserAddress(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUserAddress = createAsyncThunk('updateUserAddress', async ({ data, id }, thunkAPI) => {
    try {
        const response = await users.updateUserAddress(data, id)
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

            //Get address by user
            .addCase(getAddressByUser.pending, (state, action) => {
                state.isUserAddressLoading = true;
                state.isUserAddressLoaded = false;
                state.isUserAddressLoadError = false;
            })

            .addCase(getAddressByUser.fulfilled, (state, action) => {
                state.isUserAddressLoading = false;
                state.isUserAddressLoaded = true;
                state.isUserAddressLoadError = false;
                state.userAddress = action.payload;
            })

            .addCase(getAddressByUser.rejected, (state, action) => {
                state.isUserAddressLoading = false;
                state.isUserAddressLoaded = false;
                state.isUserAddressLoadError = true;
            })

            .addCase(createUserAddress.pending, (state, action) => {
                state.isUserAddressCreating = true;
                state.isUserAddressCreated = false;
                state.isUserAddressCreateError = false;
            })

            .addCase(createUserAddress.fulfilled, (state, action) => {
                state.isUserAddressCreating = false;
                state.isUserAddressCreated = true;
                state.isUserAddressCreateError = false;
            })

            .addCase(createUserAddress.rejected, (state, action) => {
                state.isUserAddressCreating = false;
                state.isUserAddressCreated = false;
                state.isUserAddressCreateError = true;
            })

            .addCase(updateUserAddress.pending, (state, action) => {
                state.isUserAddressUpdating = true;
                state.isUserAddressUpdated = false;
                state.isUserAddressCreateError = false;
            })

            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.isUserAddressUpdating = false;
                state.isUserAddressUpdated = true;
                state.isUserAddressUpdateError = false;
            })

            .addCase(updateUserAddress.rejected, (state, action) => {
                state.isUserAddressUpdating = false;
                state.isUserAddressUpdated = false;
                state.isUserAddressUpdateError = true;
            })


    }
})


export default userSlice.reducer