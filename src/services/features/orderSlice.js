"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { order } from "../actions/order";

const initialState = {
    isAllOrdersLoading: false,
    isAllOrdersLoaded: false,
    isAllOrdersLoadError: false,
    allOrders: [],

    isOrderCreating: false,
    isOrderCreated: false,
    isOrderCreateError: false,

    isOrderLoading: false,
    isOrderLoaded: false,
    isOrderLoadError: false,
    singleOrder: {},

    isOrderItemLoading: false,
    isOrderItemLoaded: false,
    isOrderItemLoadError: false,
    orderItem: [],

    isAllOrderItemsLoading: false,
    isAllOrderItemsLoaded: false,
    isAllOrderItemsLoadError: false,
    allOrderItems: [],

    isUserOrdersLoading: false,
    isUserOrdersLoaded: false,
    isUserOrdersLoadError: false,
    userOrders: [],

    isDashboardOrdersLoading: false,
    isDashboardOrdersLoaded: false,
    isDashboardOrdersLoadError: false,
    dashboardOrders: [],

    isOrderCanceling: false,
    isOrderCanceled: false,
    isOrderCancelError: false,

    isIndividualOrderCanceling: false,
    isIndividualOrderCanceled: false,
    isIndividualOrderCancelError: false,

    isPickerAssigning: false,
    isPickerAssigned: false,
    isPickerAssigningError: false,


    isAssignedOrdersLoading: false,
    isAssignedOrdersLoaded: false,
    isAssignedOrdersLoadError: false,
    assignedOrders: [],

    isVeryfing: false,
    isVeryfed: false,
    isVeryfingError: false,


    isDriverAssigning: false,
    isDriverAssigned: false,
    isDriverAssigningError: false,

    isTripSheetLoading: false,
    isTripSheetLoaded: false,
    isTripSheetLoadError: false,
    tripSheet: [],

    isCancelledOrdersLoading: false,
    isCancelledOrdersLoaded: false,
    isCancelledOrdersLoadError: false,
    cancelledOrders: [],

    isAllReturnsByAdminLoading: false,
    isAllReturnsByAdminLoaded: false,
    isAllReturnsByAdminLoadError: false,
    allReturnsByAdmin: [],

    isAllReplacesByAdminLoading: false,
    isAllReplacesByAdminLoaded: false,
    isAllReplacesByAdminLoadError: false,
    allReplacesByAdmin: [],

    isOrderQuantityUpdating: false,
    isOrderQuantityUpdated: false,
    isOrderQuantityUpdateError: false,

    isCreatingReason: false,
    isCreatedReason: false,
    isCreatingReasonError: false,

    isUpdatingReason: false,
    isUpdatedReason: false,
    isUpdatingReasonError: false,

    isDeletingReason: false,
    isDeletedReason: false,
    isDeletingReasonError: false,

    isAllReasonsLoading: false,
    isAllReasonsLoaded: false,
    isAllReasonsLoadError: false,
    allReasons: [],

    isReturnReplaceDriverAssigning: false,
    isReturnReplaceDriverAssigned: false,
    isReturnReplaceDriverAssigningError: false,

}

export const getAllOrdersByAdmin = createAsyncThunk('getAllOrdersByAdmin', async ({
    driver_id,
    order_status_id,
    payment_method,
    accepted_by,
    sort_by,
    search_query
}, thunkAPI) => {
    try {
        const response = await order.getAllOrdersByAdmin({
            driver_id,
            order_status_id,
            payment_method,
            accepted_by,
            sort_by,
            search_query
        });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createOrder = createAsyncThunk('createOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.createOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getOrder = createAsyncThunk('getOrder', async ({ id }, thunkAPI) => {
    try {
        const response = await order.getOrder(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getOrderItem = createAsyncThunk('getOrderItem', async ({ id }, thunkAPI) => {
    try {
        const response = await order.getOrderItem(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllOrderItems = createAsyncThunk('getAllOrderItems', async ({ id }, thunkAPI) => {
    try {
        const response = await order.getAllOrderItems(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getUserOrders = createAsyncThunk('getUserOrders', async ({ sort, filters }, thunkAPI) => {
    try {
        const response = await order.getUserOrders({ sort, filters });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const getAllDashbordOrders = createAsyncThunk('getAllDashbordOrders', async ({ data }, thunkAPI) => {
    try {
        const response = await order.getAllDashbordOrders(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const cancelOrder = createAsyncThunk('cancelOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.cancelOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const cancelIndividualOrder = createAsyncThunk('cancelIndividualOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.cancelIndividualOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const handleAssignPicker = createAsyncThunk('handleAssignPicker', async ({ data }, thunkAPI) => {
    try {

        const response = await order.handleAssignPicker(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const returnProduct = createAsyncThunk('returnProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await order.returnProduct(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




export const getAllAssigedOrders = createAsyncThunk('getAllAssigedOrders', async ({ data }, thunkAPI) => {
    try {

        const response = await order.getAllAssigedOrders(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const replaceProduct = createAsyncThunk('replaceProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await order.replaceProduct(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const handleVerifyItem = createAsyncThunk('handleVerifyItem', async ({ data }, thunkAPI) => {
    try {

        const response = await order.handleVerifyItem(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const handleAssignDriver = createAsyncThunk('handleAssignDriver', async ({ data }, thunkAPI) => {
    try {

        const response = await order.handleAssignDriver(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const handleAssignReturnReplaceDriver = createAsyncThunk('handleAssignReturnReplaceDriver', async ({ data }, thunkAPI) => {
    try {

        const response = await order.handleAssignReturnReplaceDriver(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const handleDownloadTripSheet = createAsyncThunk('handleDownloadTripSheet', async ({ data }, thunkAPI) => {
    try {

        const response = await order.handleDownloadTripSheet(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


//get cancelled 
export const getCancelledOrders = createAsyncThunk('getCancelledOrders', async ({ }, thunkAPI) => {
    try {

        const response = await order.getCancelledOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get all returns by admin  
export const getAllReturnsByAdmin = createAsyncThunk('getAllReturnsByAdmin', async ({ }, thunkAPI) => {
    try {

        const response = await order.getAllReturnsByAdmin();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get all replacements by admin  
export const getAllReplacementsByAdmin = createAsyncThunk('getAllReplacementsByAdmin', async ({ }, thunkAPI) => {
    try {

        const response = await order.getAllReplacementsByAdmin();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Update order qunatity
export const updateOrderQuantity = createAsyncThunk('updateOrderQuantity', async ({ data }, thunkAPI) => {
    try {

        const response = await order.updateOrderQuantity(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Create reasons
export const createReason = createAsyncThunk('createReason', async ({ data }, thunkAPI) => {
    try {

        const response = await order.createReason(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Update reasons
export const updateReason = createAsyncThunk('updateReason', async ({ data, id }, thunkAPI) => {
    try {

        const response = await order.updateReason({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Update reasons
export const deleteReason = createAsyncThunk('deleteReason', async ({ data }, thunkAPI) => {
    try {

        const response = await order.deleteReason(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Get all reasons
export const getAllReasons = createAsyncThunk('getAllReasons', async ({ type }, thunkAPI) => {
    try {

        const response = await order.getAllReasons({ type });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            //Get all orders by admin   
            .addCase(getAllOrdersByAdmin.pending, (state, action) => {
                state.isAllOrdersLoading = true;
                state.isAllOrdersLoaded = false;
                state.isAllOrdersLoadError = false;
            })
            .addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
                state.isAllOrdersLoading = false;
                state.isAllOrdersLoaded = true;
                state.isAllOrdersLoadError = false;
                state.allOrders = action.payload;
            })
            .addCase(getAllOrdersByAdmin.rejected, (state, action) => {
                state.isAllOrdersLoading = false;
                state.isAllOrdersLoaded = false;
                state.isAllOrdersLoadError = true;
            })

            // Create order
            .addCase(createOrder.pending, (state, action) => {
                state.isOrderCreating = true;
                state.isOrderCreated = false;
                state.isOrderCreateError = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isOrderCreating = false;
                state.isOrderCreated = true;
                state.isOrderCreateError = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isOrderCreating = false;
                state.isOrderCreated = false;
                state.isOrderCreateError = true;
            })
            // Get order
            .addCase(getOrder.pending, (state, action) => {
                state.isOrderLoading = true;
                state.isOrderLoaded = false;
                state.isOrderLoadError = false;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.isOrderLoaded = true;
                state.isOrderLoadError = false;
                state.singleOrder = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isOrderLoading = false;
                state.isOrderLoaded = false;
                state.isOrderLoadError = true;
            })

            // Get order item
            .addCase(getOrderItem.pending, (state, action) => {
                state.isOrderItemLoading = true;
                state.isOrderItemLoaded = false;
                state.isOrderItemLoadError = false;
            })
            .addCase(getOrderItem.fulfilled, (state, action) => {
                state.isOrderItemLoading = false;
                state.isOrderItemLoaded = true;
                state.isOrderItemLoadError = false;
                state.orderItem = action.payload;
            })
            .addCase(getOrderItem.rejected, (state, action) => {
                state.isOrderItemLoading = false;
                state.isOrderItemLoaded = false;
                state.isOrderItemLoadError = true;
            })

            // Get all order items
            .addCase(getAllOrderItems.pending, (state, action) => {
                state.isAllOrderItemsLoading = true;
                state.isAllOrderItemsLoaded = false;
                state.isAllOrderItemsLoadError = false;
            })
            .addCase(getAllOrderItems.fulfilled, (state, action) => {
                state.isAllOrderItemsLoading = false;
                state.isAllOrderItemsLoaded = true;
                state.isAllOrderItemsLoadError = false;
                state.allOrderItems = action.payload;
            })
            .addCase(getAllOrderItems.rejected, (state, action) => {
                state.isAllOrderItemsLoading = false;
                state.isAllOrderItemsLoaded = false;
                state.isAllOrderItemsLoadError = true;
            })

            // Get user orders
            .addCase(getUserOrders.pending, (state, action) => {
                state.isUserOrdersLoading = true;
                state.isUserOrdersLoaded = false;
                state.isUserOrdersLoadError = false;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isUserOrdersLoading = false;
                state.isUserOrdersLoaded = true;
                state.isUserOrdersLoadError = false;
                state.userOrders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isUserOrdersLoading = false;
                state.isUserOrdersLoaded = false;
                state.isUserOrdersLoadError = true;
            })

            // Get All Dashboard orders
            .addCase(getAllDashbordOrders.pending, (state, action) => {
                state.isDashboardOrdersLoading = true;
                state.isDashboardOrdersLoaded = false;
                state.isDashboardOrdersLoadError = false;
            })
            .addCase(getAllDashbordOrders.fulfilled, (state, action) => {
                state.isDashboardOrdersLoading = false;
                state.isDashboardOrdersLoaded = true;
                state.isDashboardOrdersLoadError = false;
                state.dashboardOrders = action.payload;
            })
            .addCase(getAllDashbordOrders.rejected, (state, action) => {
                state.isDashboardOrdersLoading = false;
                state.isDashboardOrdersLoaded = false;
                state.isDashboardOrdersLoadError = true;
            })


            //cancel order
            .addCase(cancelOrder.pending, (state, action) => {
                state.isOrderCanceling = true;
                state.isOrderCanceled = false;
                state.isOrderCancelError = false;
            })

            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isOrderCanceling = false;
                state.isOrderCanceled = true;
                state.isOrderCancelError = false;
            })

            .addCase(cancelOrder.rejected, (state, action) => {
                state.isOrderCanceling = false;
                state.isOrderCanceled = false;
                state.isOrderCancelError = true;
            })

            //cancel individual Order
            .addCase(cancelIndividualOrder.pending, (state, action) => {
                state.isIndividualOrderCanceling = true;
                state.isIndividualOrderCanceled = false;
                state.isIndividualOrderCancelError = false;
            })

            .addCase(cancelIndividualOrder.fulfilled, (state, action) => {
                state.isIndividualOrderCanceling = false;
                state.isIndividualOrderCanceled = true;
                state.isIndividualOrderCancelError = false;
            })

            .addCase(cancelIndividualOrder.rejected, (state, action) => {
                state.isIndividualOrderCanceling = false;
                state.isIndividualOrderCanceled = false;
                state.isIndividualOrderCancelError = true;
            })



            .addCase(handleAssignPicker.pending, (state, action) => {
                state.isPickerAssigning = true;
                state.isPickerAssigned = false;
                state.isPickerAssigningError = false;
            })

            .addCase(handleAssignPicker.fulfilled, (state, action) => {
                state.isPickerAssigning = false;
                state.isPickerAssigned = true;
                state.isPickerAssigningError = false;
            })

            .addCase(handleAssignPicker.rejected, (state, action) => {
                state.isPickerAssigning = false;
                state.isPickerAssigned = false;
                state.isPickerAssigningError = true;
            })


            // Get All Assigned orders
            .addCase(getAllAssigedOrders.pending, (state, action) => {
                state.isAssignedOrdersLoading = true;
                state.isAssignedOrdersLoaded = false;
                state.isAssignedOrdersLoadError = false;
            })
            .addCase(getAllAssigedOrders.fulfilled, (state, action) => {
                state.isAssignedOrdersLoading = false;
                state.isAssignedOrdersLoaded = true;
                state.isAssignedOrdersLoadError = false;
                state.dashboardOrders = action.payload;
            })
            .addCase(getAllAssigedOrders.rejected, (state, action) => {
                state.isAssignedOrdersLoading = false;
                state.isAssignedOrdersLoaded = false;
                state.isAssignedOrdersLoadError = true;
            })


            .addCase(handleVerifyItem.pending, (state, action) => {
                state.isVeryfing = true;
                state.isVeryfed = false;
                state.isVeryfingError = false;
            })

            .addCase(handleVerifyItem.fulfilled, (state, action) => {
                state.isVeryfing = false;
                state.isVeryfed = true;
                state.isVeryfingError = false;
            })

            .addCase(handleVerifyItem.rejected, (state, action) => {
                state.isVeryfing = false;
                state.isVeryfed = false;
                state.isVeryfingError = true;
            })


            .addCase(handleAssignDriver.pending, (state, action) => {
                state.isDriverAssigning = true;
                state.isDriverAssigned = false;
                state.isDriverAssigningError = false;
            })

            .addCase(handleAssignDriver.fulfilled, (state, action) => {
                state.isDriverAssigning = false;
                state.isDriverAssigned = true;
                state.isDriverAssigningError = false;
            })

            .addCase(handleAssignDriver.rejected, (state, action) => {
                state.isDriverAssigning = false;
                state.isDriverAssigned = false;
                state.isDriverAssigningError = true;
            })

            .addCase(getCancelledOrders.pending, (state, action) => {
                state.isCancelledOrdersLoading = true;
                state.isCancelledOrdersLoaded = false;
                state.isCancelledOrdersLoadError = false;
            })

            .addCase(getCancelledOrders.fulfilled, (state, action) => {
                state.isCancelledOrdersLoading = false;
                state.isCancelledOrdersLoaded = true;
                state.isCancelledOrdersLoadError = false;
                state.cancelledOrders = action.payload;
            })

            .addCase(getCancelledOrders.rejected, (state, action) => {
                state.isCancelledOrdersLoading = false;
                state.isCancelledOrdersLoaded = false;
                state.isCancelledOrdersLoadError = true;
            })

            .addCase(getAllReturnsByAdmin.pending, (state, action) => {
                state.isAllReturnsByAdminLoading = true;
                state.isAllReturnsByAdminLoaded = false;
                state.isAllReturnsByAdminLoadError = false;
            })

            .addCase(getAllReturnsByAdmin.fulfilled, (state, action) => {
                state.isAllReturnsByAdminLoading = false;
                state.isAllReturnsByAdminLoaded = true;
                state.isAllReturnsByAdminLoadError = false;
                state.allReturnsByAdmin = action.payload;
            })

            .addCase(getAllReturnsByAdmin.rejected, (state, action) => {
                state.isAllReturnsByAdminLoading = false;
                state.isAllReturnsByAdminLoaded = false;
                state.isAllReturnsByAdminLoadError = true;
            })

            .addCase(getAllReplacementsByAdmin.pending, (state, action) => {
                state.isAllReplacesByAdminLoading = true;
                state.isAllReplacesByAdminLoaded = false;
                state.isAllReplacesByAdminLoadError = false;
            })

            .addCase(getAllReplacementsByAdmin.fulfilled, (state, action) => {
                state.isAllReplacesByAdminLoading = false;
                state.isAllReplacesByAdminLoaded = true;
                state.isAllReplacesByAdminLoadError = false;
                state.allReplacesByAdmin = action.payload;
            })

            .addCase(getAllReplacementsByAdmin.rejected, (state, action) => {
                state.isAllReplacesByAdminLoading = false;
                state.isAllReplacesByAdminLoaded = false;
                state.isAllReplacesByAdminLoadError = true;
            })


            .addCase(updateOrderQuantity.pending, (state, action) => {
                state.isOrderQuantityUpdating = true;
                state.isOrderQuantityUpdated = false;
                state.isOrderQuantityUpdateError = false;
            })
            .addCase(updateOrderQuantity.fulfilled, (state, action) => {
                state.isOrderQuantityUpdating = false;
                state.isOrderQuantityUpdated = true;
                state.isOrderQuantityUpdateError = false;
            })
            .addCase(updateOrderQuantity.rejected, (state, action) => {
                state.isOrderQuantityUpdating = false;
                state.isOrderQuantityUpdated = false;
                state.isOrderQuantityUpdateError = true;
            })

            // Create Reason
            .addCase(createReason.pending, (state, action) => {
                state.isCreatingReason = true;
                state.isCreatedReason = false;
                state.isCreatingReasonError = false;
            })

            .addCase(createReason.fulfilled, (state, action) => {
                state.isCreatingReason = false;
                state.isCreatedReason = true;
                state.isCreatingReasonError = false;
            })

            .addCase(createReason.rejected, (state, action) => {
                state.isCreatingReason = false;
                state.isCreatedReason = false;
                state.isCreatingReasonError = true;
            })

            // Update reason
            .addCase(updateReason.pending, (state, action) => {
                state.isUpdatingReason = true;
                state.isUpdatedReason = false;
                state.isUpdatingReasonError = false;
            })

            .addCase(updateReason.fulfilled, (state, action) => {
                state.isUpdatingReason = false;
                state.isUpdatedReason = true;
                state.isUpdatingReasonError = false;
            })

            .addCase(updateReason.rejected, (state, action) => {
                state.isUpdatingReason = false;
                state.isUpdatedReason = false;
                state.isUpdatingReasonError = true;
            })

            // delete reason
            .addCase(deleteReason.pending, (state, action) => {
                state.isDeletingReason = true;
                state.isDeletedReason = false;
                state.isDeletingReasonError = false;
            })

            .addCase(deleteReason.fulfilled, (state, action) => {
                state.isDeletingReason = false;
                state.isDeletedReason = true;
                state.isDeletingReasonError = false;
            })

            .addCase(deleteReason.rejected, (state, action) => {
                state.isDeletingReason = false;
                state.isDeletedReason = false;
                state.isDeletingReasonError = true;
            })

            // get all reasons
            .addCase(getAllReasons.pending, (state, action) => {
                state.isAllReasonsLoading = true;
                state.isAllReasonsLoaded = false;
                state.isAllReasonsLoadError = false;
            })

            .addCase(getAllReasons.fulfilled, (state, action) => {
                state.isAllReasonsLoading = false;
                state.isAllReasonsLoaded = true;
                state.isAllReasonsLoadError = false;
                state.allReasons = action.payload;
            })

            .addCase(getAllReasons.rejected, (state, action) => {
                state.isAllReasonsLoading = false;
                state.isAllReasonsLoaded = false;
                state.isAllReasonsLoadError = true;
            })


            .addCase(handleAssignReturnReplaceDriver.pending, (state, action) => {
                state.isReturnReplaceDriverAssigning = true;
                state.isReturnReplaceDriverAssigned = false;
                state.isReturnReplaceDriverAssigningError = false;
            })

            .addCase(handleAssignReturnReplaceDriver.fulfilled, (state, action) => {
                state.isReturnReplaceDriverAssigning = false;
                state.isReturnReplaceDriverAssigned = true;
                state.isReturnReplaceDriverAssigningError = false;
            })

            .addCase(handleAssignReturnReplaceDriver.rejected, (state, action) => {
                state.isReturnReplaceDriverAssigning = false;
                state.isReturnReplaceDriverAssigned = false;
                state.isReturnReplaceDriverAssigningError = true;
            })
    }
})

export default orderSlice.reducer