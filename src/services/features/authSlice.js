"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";
import { handleLogin } from "@/utils/auth";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies()

const initialState = {

    isUserLogging: false,
    isUserLogged: false,
    isUserLoginError: false,

    isLoginOtpVerifying: false,
    isLoginOtpVerified: false,
    isLoginOtpVerifyError: false,

    isLoginOtpResending: false,
    isLoginOtpResent: false,
    isLoginOtpResendError: false,

    isUserRegistering: false,
    isUserRegisterd: false,
    isUserRegisterError: false,
    isEmailVerifying: false,
    isEmailVerified: false,
    isEmailVerifyError: false,
    isUserInfoLoading: false,
    isUserInfoLoaded: false,
    isUserInfoError: false,
    userInfo: {},
    isUserEmailUpdating: false,
    isUserEmailUpdated: false,
    isUserEmailUpdateError: false,
    isUserMobileUpdating: false,
    isUserMobileUpdated: false,
    isUserMobileUpdateError: false,

    isOtpSending: false,
    isOtpSent: false,
    isOtpSendingError: false,

    isEmailSending: false,
    isEmailSent: false,
    isEmailSendingError: false,

    isOtpVerifying: false,
    isOtpVerified: false,
    isOtpVerifyError: false,

    isForgotPasswordSending: false,
    isForgotPasswordSent: false,
    isForgotPasswordSendingError: false,

    isPasswordResetting: false,
    isPasswordReset: false,
    isPasswordResetingError: false,
}

export const login = createAsyncThunk('login', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.login(data)
        // localStorage.setItem('token', response.data.result?.token)
        // localStorage.setItem('user', JSON.stringify(response.data.result?.user))

        // Token set in Cookies
        cookies.set('token', response.data.result?.token);

        Axios.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${response.data.result?.token}`;
            return config;
        });

        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const loginWithOtp = createAsyncThunk('loginWithOtp', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.loginWithOtp(data);

        // Token set in Cookies
        cookies.set('token', response.data.result?.token)
        Axios.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${response.data.result?.token}`;
            return config;
        });

        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyLoginOtp = createAsyncThunk('verifyLoginOtp', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.verifyLoginOtp(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resendLoginOtp = createAsyncThunk('resendLoginOtp', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.resendLoginOtp(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const userRegister = createAsyncThunk('userRegister', async (data, thunkAPI) => {
    try {
        const response = await auth.userRegister(data)
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyEmail = createAsyncThunk('verifyEmail', async (data, thunkAPI) => {
    try {
        const response = await auth.verifyEmail(data)
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const companyRegister = createAsyncThunk('companyRegister', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.companyRegister(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getUserInfo = createAsyncThunk('getUserInfo', async (data, thunkAPI) => {
    try {
        const response = await auth.getUserInfo(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUserEmail = createAsyncThunk('updateUserEmail', async ({ data, token }, thunkAPI) => {
    try {
        const response = await auth.updateUserEmail(data, token)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUserMobile = createAsyncThunk('updateUserMobile', async ({ data, token }, thunkAPI) => {
    try {
        const response = await auth.updateUserMobile(data, token)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resendOtp = createAsyncThunk('resendOtp', async ({ token }, thunkAPI) => {
    try {
        const response = await auth.resendOtp(token)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resendEmail = createAsyncThunk('resendEmail', async ({ token }, thunkAPI) => {
    try {
        const response = await auth.resendEmail(token)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyOtp = createAsyncThunk('verifyOtp', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.verifyOtp(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const forgotPassword = createAsyncThunk('forgotPassword', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.forgotPassword(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resetPassword = createAsyncThunk('resetPassword', async ({ data }, thunkAPI) => {
    try {
        const response = await auth.resetPassword(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(login.pending, (state, action) => {
                state.isUserLogging = true;
                state.isUserLogged = false;
                state.isUserLoginError = false;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isUserLogging = false;
                state.isUserLogged = true;
                state.isUserLoginError = false;
            })

            .addCase(login.rejected, (state, action) => {
                state.isUserLogging = false;
                state.isUserLogged = false;
                state.isUserLoginError = true;
            })

            //login with otp
            .addCase(loginWithOtp.pending, (state, action) => {
                state.isUserLogging = true;
                state.isUserLogged = false;
                state.isUserLoginError = false;
            })

            .addCase(loginWithOtp.fulfilled, (state, action) => {
                state.isUserLogging = false;
                state.isUserLogged = true;
                state.isUserLoginError = false;
            })

            .addCase(loginWithOtp.rejected, (state, action) => {
                state.isUserLogging = false;
                state.isUserLogged = false;
                state.isUserLoginError = true;
            })

            //Verify login otp
            .addCase(verifyLoginOtp.pending, (state, action) => {
                state.isLoginOtpVerifying = true;
                state.isLoginOtpVerified = false;
                state.isLoginOtpVerifyError = false;
            })

            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.isLoginOtpVerifying = false;
                state.isLoginOtpVerified = true;
                state.isLoginOtpVerifyError = false;
            })

            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.isLoginOtpVerifying = false;
                state.isLoginOtpVerified = false;
                state.isLoginOtpVerifyError = true;
            })

            //Resend login otp
            .addCase(resendLoginOtp.pending, (state, action) => {
                state.isLoginOtpResending = true;
                state.isLoginOtpResent = false;
                state.isLoginOtpResendError = false;
            })

            .addCase(resendLoginOtp.fulfilled, (state, action) => {
                state.isLoginOtpResending = false;
                state.isLoginOtpResent = true;
                state.isLoginOtpResendError = false;
            })

            .addCase(resendLoginOtp.rejected, (state, action) => {
                state.isLoginOtpResending = false;
                state.isLoginOtpResent = false;
                state.isLoginOtpResendError = true;
            })


            //user register
            .addCase(userRegister.pending, (state, action) => {
                state.isUserRegistering = true;
                state.isUserRegisterd = false;
                state.isUserRegisterError = false;
            })

            .addCase(userRegister.fulfilled, (state, action) => {
                state.isUserRegistering = false;
                state.isUserRegisterd = true;
                state.isUserRegisterError = false;
            })

            .addCase(userRegister.rejected, (state, action) => {
                state.isUserRegistering = false;
                state.isUserRegisterd = false;
                state.isUserRegisterError = true;
            })

            .addCase(verifyEmail.pending, (state, action) => {
                state.isEmailVerifying = true;
                state.isEmailVerified = false;
                state.isEmailVerifyError = false;
            })

            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isEmailVerifying = false;
                state.isEmailVerified = true;
                state.isEmailVerifyError = false;
            })

            .addCase(verifyEmail.rejected, (state, action) => {
                state.isEmailVerifying = false;
                state.isEmailVerified = false;
                state.isEmailVerifyError = true;
            })

            .addCase(getUserInfo.pending, (state, action) => {
                state.isUserInfoLoading = true;
                state.isUserInfoLoaded = false;
                state.isUserInfoError = false;
            })

            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isUserInfoLoading = false;
                state.isUserInfoLoaded = true;
                state.isUserInfoError = false;
                state.userInfo = action.payload;
            })

            .addCase(getUserInfo.rejected, (state, action) => {
                state.isUserInfoLoading = false;
                state.isUserInfoLoaded = false;
                state.isUserInfoError = true;
            })

            .addCase(updateUserEmail.pending, (state, action) => {
                state.isUserEmailUpdating = true;
                state.isUserEmailUpdated = false;
                state.isUserEmailUpdateError = false;
            })

            .addCase(updateUserEmail.fulfilled, (state, action) => {
                state.isUserEmailUpdating = false;
                state.isUserEmailUpdated = true;
                state.isUserEmailUpdateError = false;
            })

            .addCase(updateUserEmail.rejected, (state, action) => {
                state.isUserEmailUpdating = false;
                state.isUserEmailUpdated = false;
                state.isUserEmailUpdateError = true;
            })

            .addCase(updateUserMobile.pending, (state, action) => {
                state.isUserMobileUpdating = true;
                state.isUserMobileUpdated = false;
                state.isUserMobileUpdateError = false;
            })

            .addCase(updateUserMobile.fulfilled, (state, action) => {
                state.isUserMobileUpdating = false;
                state.isUserMobileUpdated = true;
                state.isUserMobileUpdateError = false;
            })

            .addCase(updateUserMobile.rejected, (state, action) => {
                state.isUserMobileUpdating = false;
                state.isUserMobileUpdated = false;
                state.isUserMobileUpdateError = true;
            })

            .addCase(resendOtp.pending, (state, action) => {
                state.isOtpSending = true;
                state.isOtpSent = false;
                state.isOtpSendingError = false;
            })

            .addCase(resendOtp.fulfilled, (state, action) => {
                state.isOtpSending = false;
                state.isOtpSent = true;
                state.isOtpSendingError = false;
            })

            .addCase(resendOtp.rejected, (state, action) => {
                state.isOtpSending = false;
                state.isOtpSent = false;
                state.isOtpSendingError = true;
            })

            .addCase(resendEmail.pending, (state, action) => {
                state.isEmailSending = true;
                state.isEmailSent = false;
                state.isEmailSendingError = false;
            })

            .addCase(resendEmail.fulfilled, (state, action) => {
                state.isEmailSending = false;
                state.isEmailSent = true;
                state.isEmailSendingError = false;
            })

            .addCase(resendEmail.rejected, (state, action) => {
                state.isEmailSending = false;
                state.isEmailSent = false;
                state.isEmailSendingError = true;
            })

            .addCase(verifyOtp.pending, (state, action) => {
                state.isOtpVerifying = true;
                state.isOtpVerified = false;
                state.isOtpVerifyError = false;
            })

            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.isOtpVerifying = false;
                state.isOtpVerified = true;
                state.isOtpVerifyError = false;
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.isOtpVerifying = false;
                state.isOtpVerified = false;
                state.isOtpVerifyError = true;
            })

            //Forgot password
            .addCase(forgotPassword.pending, (state, action) => {
                state.isForgotPasswordSending = true;
                state.isForgotPasswordSent = false;
                state.isForgotPasswordSendingError = false;
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isForgotPasswordSending = false;
                state.isForgotPasswordSent = true;
                state.isForgotPasswordSendingError = false;
            })

            .addCase(forgotPassword.rejected, (state, action) => {
                state.isForgotPasswordSending = false;
                state.isForgotPasswordSent = false;
                state.isForgotPasswordSendingError = true;
            })

            //Reset password
            .addCase(resetPassword.pending, (state, action) => {
                state.isPasswordResetting = true;
                state.isPasswordReset = false;
                state.isPasswordResetingError = false;
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isPasswordResetting = false;
                state.isPasswordReset = true;
                state.isPasswordResetingError = false;
            })

            .addCase(resetPassword.rejected, (state, action) => {
                state.isPasswordResetting = false;
                state.isPasswordReset = false;
                state.isPasswordResetingError = true;
            })
    }
})

export default authSlice.reducer