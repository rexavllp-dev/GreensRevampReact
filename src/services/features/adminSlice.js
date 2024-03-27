"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../actions/admin";

const initialState = {

    isHomeBannerLoading: false,
    isHomeBannerLoaded: false,
    isHomeBannerLoadError: false,
    homebanners: [],

    isHomeBannerUpdating: false,
    isHomeBannerUpdated: false,
    isHomeBannerUpdateError: false,

    isLatestOrdersLoading: false,
    isLatestOrdersLoaded: false,
    isLatestOrdersLoadError: false,
    latestOrders: [],

    isLatestCancelledOrdersLoading: false,
    isLatestCancelledOrdersLoaded: false,
    isLatestCancelledOrdersLoadError: false,
    latestCancelledOrders: [],

    isLatestReturnedOrdersLoading: false,
    isLatestReturnedOrdersLoaded: false,
    isLatestReturnedOrdersLoadError: false,
    latestReturnedOrders: [],

    isLatestReplacedOrdersLoading: false,
    isLatestReplacedOrdersLoaded: false,
    isLatestReplacedOrdersLoadError: false,
    latestReplacedOrders: [],

    isOutOfStockProductsLoading: false,
    isOutOfStockProductsLoaded: false,
    isOutOfStockProductsLoadError: false,
    outOfStockProducts: [],

    isExpiredProductsLoading: false,
    isExpiredProductsLoaded: false,
    isExpiredProductsLoadError: false,
    expiredProducts: [],

    isAllMinQtyProductsLoading: false,
    isAllMinQtyProductsLoaded: false,
    isAllMinQtyProductsLoadError: false,
    allMinQtyProducts: [],

    isExpiredTradeLicensesLoading: false,
    isExpiredTradeLicensesLoaded: false,
    isExpiredTradeLicensesLoadError: false,
    expiredTradeLicenses: [],

    isTotalOrderCountLoading: false,
    isTotalOrderCountLoaded: false,
    isTotalOrderCountLoadError: false,
    totalOrderCount: {},

    isTotalSalesLoading: false,
    isTotalSalesLoaded: false,
    isTotalSalesLoadError: false,
    totalSales: {},

    isTotalCountDashboardLoading: false,
    isTotalCountDashboardLoaded: false,
    isTotalCountDashboardLoadError: false,
    totalCountDashboard: {},

    addHomeCategoryLoading: false,
    addHomeCategoryLoaded: false,
    addHomeCategoryLoadError: false,


    addHomeBrandLoading: false,
    addHomeBrandLoaded: false,
    addHomeBrandLoadError: false,


    listHomeCategoryLoading: false,
    listHomeCategoryLoaded: false,
    listHomeCategoryLoadError: false,
    listhomecategory: {},

    deleteHomeCategoryLoading: false,
    deleteHomeCategoryLoaded: false,
    deleteHomeCategoryLoadError: false,

    listHomeBrandLoading: false,
    listHomeBrandLoaded: false,
    listHomeBrandLoadError: false,
    listhomebrand: {},


    deleteHomeBrandLoading: false,
    deleteHomeBrandLoaded: false,
    deleteHomeBrandLoadError: false,


    listSeasonLoading: false,
    listSeasonLoaded: false,
    listSeasonLoadError: false,
    allseasons: {},


    createSeasonLoading: false,
    createSeasonLoaded: false,
    createSeasonLoadError: false,


    deleteSeasonLoading: false,
    deleteSeasonLoaded: false,
    deleteSeasonLoadError: false,

    updateSeasonLoading: false,
    updateSeasonLoaded: false,
    updateSeasonLoadError: false,


    listAdsLoading: false,
    listAdsLoaded: false,
    listAdsLoadError: false,
    allads: {},


    createAdsLoading: false,
    createAdsLoaded: false,
    createAdsLoadError: false,


    deleteAdsLoading: false,
    deleteAdsLoaded: false,
    deleteAdsLoadError: false,

    updateAdsLoading: false,
    updateAdsLoaded: false,
    updateAdsLoadError: false,

    isAllRolesLoading: false,
    isAllRolesLoaded: false,
    isAllRolesLoadError: false,
    allRoles: [],

    isPendingCompanyApprovalLoading: false,
    isPendingCompanyApprovalLoaded: false,
    isPendingCompanyApprovalLoadError: false,
    pendingCompanyApprovals: [],
}


// update banner
export const updateBanner = createAsyncThunk('updateBanner', async ({ data, id }, thunkAPI) => {
    try {
        const response = await admin.updateBanner({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



// Get latest orders
export const getLatestOrders = createAsyncThunk('getLatestOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// listBanner
export const listBanner = createAsyncThunk('listBanner', async ({ }, thunkAPI) => {
    try {
        const response = await admin.listBanner();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get latest cancelled orders
export const getLatestCancelledOrders = createAsyncThunk('getLatestCancelledOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestCancelledOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
// Get latest returned orders
export const getLatestReturnedOrders = createAsyncThunk('getLatestReturnedOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestReturnedOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get latest replaced orders 
export const getLatestReplacedOrders = createAsyncThunk('getLatestReplacedOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestReplacedOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get out of stock products
export const getOutOfStockProducts = createAsyncThunk('getOutOfStockProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getOutOfStockProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Get expired products list
export const getExpiredProducts = createAsyncThunk('getExpiredProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getExpiredProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get all min qty products loading
export const getAllMinQtyProducts = createAsyncThunk('getAllMinQtyProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getAllMinQtyProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get expired trade licenses
export const getExpiredTradeLicenses = createAsyncThunk('getExpiredTradeLicenses', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getExpiredTradeLicenses();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get total order count
export const getTotalOrderCount = createAsyncThunk('getTotalOrderCount', async ({filter }, thunkAPI) => {
    try {
        const response = await admin.getTotalOrderCount(filter);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get total sales
export const getTotalSales = createAsyncThunk('getTotalSales', async ({ filterBy, fromDate, toDate }, thunkAPI) => {
    try {
        const response = await admin.getTotalSales({ filterBy, fromDate, toDate });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get total count in dashboard tables
export const getTotalCountDashboard = createAsyncThunk('getTotalCountDashboard', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getTotalCountDashboard();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const listHomeCategory = createAsyncThunk('listHomeCategory', async ({ }, thunkAPI) => {
    try {


        const response = await admin.listHomeCategory();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const addHomePageCategory = createAsyncThunk('addHomePageCategory', async ({ data }, thunkAPI) => {

    try {
        const response = await admin.addHomePageCategory({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



// update banner
export const deleteHomeCategory = createAsyncThunk('deleteHomeCategory', async ({ data }, thunkAPI) => {
    try {

        const response = await admin.deleteHomeCategory({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})





export const listHomeBrand = createAsyncThunk('listHomeBrand', async ({ }, thunkAPI) => {
    try {

        const response = await admin.listHomeBrand();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const addHomePageBrand = createAsyncThunk('addHomePageBrand', async ({ data }, thunkAPI) => {

    try {
        const response = await admin.addHomePageBrand({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const deleteHomeBrand = createAsyncThunk('deleteHomeBrand', async ({ data }, thunkAPI) => {
    try {


        const response = await admin.deleteHomeBrand({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const listHomeSeason = createAsyncThunk('listHomeSeason', async ({ }, thunkAPI) => {
    try {
        const response = await admin.listHomeSeason();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




export const createSeason = createAsyncThunk('createSeason', async ({ data }, thunkAPI) => {

    try {

        const response = await admin.createSeason({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateSeason = createAsyncThunk('updateSeason', async ({ data, id }, thunkAPI) => {

    try {
        const response = await admin.updateSeason({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const deleteSeason = createAsyncThunk('deleteSeason', async ({ data }, thunkAPI) => {
    try {
        const response = await admin.deleteSeason({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getSeason = createAsyncThunk('getSeason', async ({ id }, thunkAPI) => {

    try {
        const response = await admin.getSeason({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const listHomeAds = createAsyncThunk('listHomeAds', async ({ }, thunkAPI) => {
    try {
        const response = await admin.listHomeAds();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




export const createAds = createAsyncThunk('createAds', async ({ data }, thunkAPI) => {

    try {

        const response = await admin.createAds({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateAds = createAsyncThunk('updateAds', async ({ data, id }, thunkAPI) => {

    try {
        const response = await admin.updateAds({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const getAds = createAsyncThunk('getAds', async ({ id }, thunkAPI) => {

    try {
        const response = await admin.getAds({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteAds = createAsyncThunk('deleteAds', async ({ data }, thunkAPI) => {
    try {
        const response = await admin.deleteAds({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




//get all roles
export const getAllRoles = createAsyncThunk('getAllRoles', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getAllRoles()
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get company approvals
export const getPendingCompanyApprovals = createAsyncThunk('getPendingCompanyApprovals', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getPendingCompanyApprovals()
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Update Banner
            .addCase(updateBanner.pending, (state) => {

                state.isHomeBannerUpdating = true;
                state.isHomeBannerUpdated = false;
                state.isHomeBannerUpdateError = false;
            })

            .addCase(updateBanner.fulfilled, (state, action) => {

                state.isHomeBannerUpdating = false;
                state.isHomeBannerUpdated = true;
                state.isHomeBannerUpdateError = false;

            })

            .addCase(updateBanner.rejected, (state, action) => {

                state.isHomeBannerLoading = false;
                state.isHomeBannerUpdated = false;
                state.isHomeBannerUpdateError = true;

            })


            // List Banner
            .addCase(listBanner.pending, (state) => {

                state.isHomeBannerLoading = true;
                state.isHomeBannerLoaded = false;
                state.isHomeBannerLoadError = false;
            })

            .addCase(listBanner.fulfilled, (state, action) => {

                state.isHomeBannerLoading = false;
                state.isHomeBannerLoaded = true;
                state.isHomeBannerLoadError = false;
                state.homebanners = action.payload;
            })

            .addCase(listBanner.rejected, (state, action) => {
                state.isHomeBannerLoading = false;
                state.isHomeBannerLoaded = false;
                state.isHomeBannerLoadError = true;

            })


            // Get latest orders
            .addCase(getLatestOrders.pending, (state) => {
                state.isLatestOrdersLoading = true;
                state.isLatestOrdersLoaded = false;
                state.isLatestOrdersLoadError = false;
            })
            .addCase(getLatestOrders.fulfilled, (state, action) => {
                state.isLatestOrdersLoading = false;
                state.isLatestOrdersLoaded = true;
                state.isLatestOrdersLoadError = false;
                state.latestOrders = action.payload;
            })
            .addCase(getLatestOrders.rejected, (state, action) => {
                state.isLatestOrdersLoading = false;
                state.isLatestOrdersLoaded = false;
                state.isLatestOrdersLoadError = true;
            })

            .addCase(getLatestCancelledOrders.pending, (state) => {
                state.isLatestCancelledOrdersLoading = true;
                state.isLatestCancelledOrdersLoaded = false;
                state.isLatestCancelledOrdersLoadError = false;
            })

            .addCase(getLatestCancelledOrders.fulfilled, (state, action) => {
                state.isLatestCancelledOrdersLoading = false;
                state.isLatestCancelledOrdersLoaded = true;
                state.isLatestCancelledOrdersLoadError = false;
                state.latestCancelledOrders = action.payload;
            })

            .addCase(getLatestCancelledOrders.rejected, (state, action) => {
                state.isLatestCancelledOrdersLoading = false;
                state.isLatestCancelledOrdersLoaded = false;
                state.isLatestCancelledOrdersLoadError = true;
            })

            .addCase(getLatestReturnedOrders.pending, (state) => {
                state.isLatestReturnedOrdersLoading = true;
                state.isLatestReturnedOrdersLoaded = false;
                state.isLatestReturnedOrdersLoadError = false;
            })

            .addCase(getLatestReturnedOrders.fulfilled, (state, action) => {
                state.isLatestReturnedOrdersLoading = false;
                state.isLatestReturnedOrdersLoaded = true;
                state.isLatestReturnedOrdersLoadError = false;
                state.latestReturnedOrders = action.payload;
            })

            .addCase(getLatestReturnedOrders.rejected, (state, action) => {
                state.isLatestReturnedOrdersLoading = false;
                state.isLatestReturnedOrdersLoaded = false;
                state.isLatestReturnedOrdersLoadError = true;
            })

            .addCase(getLatestReplacedOrders.pending, (state) => {
                state.isLatestReplacedOrdersLoading = true;
                state.isLatestReplacedOrdersLoaded = false;
                state.isLatestReplacedOrdersLoadError = false;
            })

            .addCase(getLatestReplacedOrders.fulfilled, (state, action) => {
                state.isLatestReplacedOrdersLoading = false;
                state.isLatestReplacedOrdersLoaded = true;
                state.isLatestReplacedOrdersLoadError = false;
                state.latestReplacedOrders = action.payload;
            })

            .addCase(getLatestReplacedOrders.rejected, (state, action) => {
                state.isLatestReplacedOrdersLoading = false;
                state.isLatestReplacedOrdersLoaded = false;
                state.isLatestReplacedOrdersLoadError = true;
            })


            .addCase(getOutOfStockProducts.pending, (state) => {
                state.isOutOfStockProductsLoading = true;
                state.isOutOfStockProductsLoaded = false;
                state.isOutOfStockProductsLoadError = false;
            })
            .addCase(getOutOfStockProducts.fulfilled, (state, action) => {
                state.isOutOfStockProductsLoading = false;
                state.isOutOfStockProductsLoaded = true;
                state.isOutOfStockProductsLoadError = false;
                state.outOfStockProducts = action.payload;
            })
            .addCase(getOutOfStockProducts.rejected, (state, action) => {
                state.isOutOfStockProductsLoading = false;
                state.isOutOfStockProductsLoaded = false;
                state.isOutOfStockProductsLoadError = true;
            })


            .addCase(getExpiredProducts.pending, (state, action) => {
                state.isExpiredProductsLoading = true;
                state.isExpiredProductsLoaded = false;
                state.isExpiredProductsLoadError = false;
            })
            .addCase(getExpiredProducts.fulfilled, (state, action) => {
                state.isExpiredProductsLoading = false;
                state.isExpiredProductsLoaded = true;
                state.isExpiredProductsLoadError = false;
                state.expiredProducts = action.payload;
            })
            .addCase(getExpiredProducts.rejected, (state, action) => {
                state.isExpiredProductsLoading = false;
                state.isExpiredProductsLoaded = false;
                state.isExpiredProductsLoadError = true;
            })

            .addCase(getAllMinQtyProducts.pending, (state, action) => {
                state.isAllMinQtyProductsLoading = true;
                state.isAllMinQtyProductsLoaded = false;
                state.isAllMinQtyProductsLoadError = false;
            })
            .addCase(getAllMinQtyProducts.fulfilled, (state, action) => {
                state.isAllMinQtyProductsLoading = false;
                state.isAllMinQtyProductsLoaded = true;
                state.isAllMinQtyProductsLoadError = false;
                state.allMinQtyProducts = action.payload;
            })
            .addCase(getAllMinQtyProducts.rejected, (state, action) => {
                state.isAllMinQtyProductsLoading = false;
                state.isAllMinQtyProductsLoaded = false;
                state.isAllMinQtyProductsLoadError = true;
            })

            .addCase(getExpiredTradeLicenses.pending, (state, action) => {
                state.isExpiredTradeLicensesLoading = true;
                state.isExpiredTradeLicensesLoaded = false;
                state.isExpiredTradeLicensesLoadError = false;
            })
            .addCase(getExpiredTradeLicenses.fulfilled, (state, action) => {
                state.isExpiredTradeLicensesLoading = false;
                state.isExpiredTradeLicensesLoaded = true;
                state.isExpiredTradeLicensesLoadError = false;
                state.expiredTradeLicenses = action.payload;
            })
            .addCase(getExpiredTradeLicenses.rejected, (state, action) => {
                state.isExpiredTradeLicensesLoading = false;
                state.isExpiredTradeLicensesLoaded = false;
                state.isExpiredTradeLicensesLoadError = true;
            })

            .addCase(getTotalOrderCount.pending, (state, action) => {
                state.isTotalOrderCountLoading = true;
                state.isTotalOrderCountLoaded = false;
                state.isTotalOrderCountLoadError = false;
            })

            .addCase(getTotalOrderCount.fulfilled, (state, action) => {
                state.isTotalOrderCountLoading = false;
                state.isTotalOrderCountLoaded = true;
                state.isTotalOrderCountLoadError = false;
                state.totalOrderCount = action.payload;
            })

            .addCase(getTotalOrderCount.rejected, (state, action) => {
                state.isTotalOrderCountLoading = false;
                state.isTotalOrderCountLoaded = false;
                state.isTotalOrderCountLoadError = true;
            })

            .addCase(getTotalSales.pending, (state, action) => {
                state.isTotalSalesLoading = true;
                state.isTotalSalesLoaded = false;
                state.isTotalSalesLoadError = false;
            })

            .addCase(getTotalSales.fulfilled, (state, action) => {
                state.isTotalSalesLoading = false;
                state.isTotalSalesLoaded = true;
                state.isTotalSalesLoadError = false;
                state.totalSales = action.payload;
            })

            .addCase(getTotalSales.rejected, (state, action) => {
                state.isTotalSalesLoading = false;
                state.isTotalSalesLoaded = false;
                state.isTotalSalesLoadError = true;
            })

            .addCase(getTotalCountDashboard.pending, (state, action) => {
                state.isTotalCountDashboardLoading = true;
                state.isTotalCountDashboardLoaded = false;
                state.isTotalCountDashboardLoadError = false;
            })

            .addCase(getTotalCountDashboard.fulfilled, (state, action) => {
                state.isTotalCountDashboardLoading = false;
                state.isTotalCountDashboardLoaded = true;
                state.isTotalCountDashboardLoadError = false;
                state.totalCountDashboard = action.payload;
            })

            .addCase(getTotalCountDashboard.rejected, (state, action) => {
                state.isTotalCountDashboardLoading = false;
                state.isTotalCountDashboardLoaded = false;
                state.isTotalCountDashboardLoadError = true;
            })


            .addCase(addHomePageCategory.pending, (state, action) => {
                state.addHomeCategoryLoading = true;
                state.addHomeCategoryLoaded = false;
                state.addHomeCategoryLoadError = false;
            })

            .addCase(addHomePageCategory.fulfilled, (state, action) => {
                state.addHomeCategoryLoading = false;
                state.addHomeCategoryLoaded = true;
                state.addHomeCategoryLoadError = false;
            })

            .addCase(addHomePageCategory.rejected, (state, action) => {
                state.addHomeCategoryLoading = false;
                state.addHomeCategoryLoaded = false;
                state.addHomeCategoryLoadError = true;
            })



            .addCase(listHomeCategory.pending, (state) => {

                state.listHomeCategoryLoading = true;
                state.listHomeCategoryLoaded = false;
                state.listHomeCategoryLoadError = false;
            })

            .addCase(listHomeCategory.fulfilled, (state, action) => {

                state.listHomeCategoryLoading = false;
                state.listHomeCategoryLoaded = true;
                state.listHomeCategoryLoadError = false;
                state.listhomecategory = action.payload;
            })

            .addCase(listHomeCategory.rejected, (state, action) => {

                state.listHomeCategoryLoading = false;
                state.listHomeCategoryLoaded = false;
                state.listHomeCategoryLoadError = true;

            })

            .addCase(deleteHomeCategory.pending, (state) => {

                state.deleteHomeCategoryLoading = true;
                state.deleteHomeCategoryLoaded = false;
                state.deleteHomeCategoryLoadError = false;
            })

            .addCase(deleteHomeCategory.fulfilled, (state, action) => {

                state.deleteHomeCategoryLoading = false;
                state.deleteHomeCategoryLoaded = true;
                state.deleteHomeCategoryLoadError = false;
                state.listhomecategory = action.payload;
            })

            .addCase(deleteHomeCategory.rejected, (state, action) => {

                state.deleteHomeCategoryLoading = false;
                state.deleteHomeCategoryLoaded = false;
                state.deleteHomeCategoryLoadError = true;

            })


            .addCase(listHomeBrand.pending, (state) => {

                state.listHomeBrandLoading = true;
                state.listHomeBrandLoaded = false;
                state.listHomeBrandLoadError = false;
            })

            .addCase(listHomeBrand.fulfilled, (state, action) => {

                state.listHomeBrandLoading = false;
                state.listHomeBrandLoaded = true;
                state.listHomeBrandLoadError = false;
                state.listhomecategory = action.payload;
            })

            .addCase(listHomeBrand.rejected, (state, action) => {

                state.listHomeBrandLoading = false;
                state.listHomeBrandLoaded = false;
                state.listHomeBrandLoadError = true;

            })


            .addCase(addHomePageBrand.pending, (state, action) => {
                state.addHomeBrandLoading = true;
                state.addHomeBrandLoaded = false;
                state.addHomeBrandLoadError = false;
            })

            .addCase(addHomePageBrand.fulfilled, (state, action) => {
                state.addHomeBrandLoading = false;
                state.addHomeBrandLoaded = true;
                state.addHomeBrandLoadError = false;
            })

            .addCase(addHomePageBrand.rejected, (state, action) => {
                state.addHomeBrandLoading = false;
                state.addHomeBrandLoaded = false;
                state.addHomeBrandLoadError = true;
            })

            .addCase(deleteHomeBrand.pending, (state) => {

                state.deleteHomeBrandLoading = true;
                state.deleteHomeBrandLoaded = false;
                state.deleteHomeBrandLoadError = false;
            })

            .addCase(deleteHomeBrand.fulfilled, (state, action) => {

                state.deleteHomeBrandLoading = false;
                state.deleteHomeBrandLoaded = true;
                state.deleteHomeBrandLoadError = false;
                state.listhomecategory = action.payload;
            })

            .addCase(deleteHomeBrand.rejected, (state, action) => {

                state.deleteHomeBrandLoading = false;
                state.deleteHomeBrandLoaded = false;
                state.deleteHomeBrandLoadError = true;

            })


            .addCase(createSeason.pending, (state, action) => {
                state.createSeasonLoading = true;
                state.createSeasonLoaded = false;
                state.createSeasonLoadError = false;
            })

            .addCase(createSeason.fulfilled, (state, action) => {
                state.createSeasonLoading = false;
                state.createSeasonLoaded = true;
                state.createSeasonLoadError = false;
            })

            .addCase(createSeason.rejected, (state, action) => {
                state.createSeasonLoading = false;
                state.createSeasonLoaded = false;
                state.createSeasonLoadError = true;
            })



            .addCase(deleteSeason.pending, (state) => {

                state.deleteSeasonLoading = true;
                state.deleteSeasonLoaded = false;
                state.deleteSeasonLoadError = false;
            })

            .addCase(deleteSeason.fulfilled, (state, action) => {

                state.deleteSeasonLoading = false;
                state.deleteSeasonLoaded = true;
                state.deleteSeasonLoadError = false;
            })

            .addCase(deleteSeason.rejected, (state, action) => {

                state.deleteSeasonLoading = false;
                state.deleteSeasonLoaded = false;
                state.deleteSeasonLoadError = true;

            })

            .addCase(updateSeason.pending, (state) => {

                state.updateSeasonLoading = true;
                state.updateSeasonLoaded = false;
                state.updateSeasonLoadError = false;
            })

            .addCase(updateSeason.fulfilled, (state, action) => {

                state.updateSeasonLoading = false;
                state.updateSeasonLoaded = true;
                state.updateSeasonLoadError = false;
            })

            .addCase(updateSeason.rejected, (state, action) => {

                state.updateSeasonLoading = false;
                state.updateSeasonLoaded = false;
                state.updateSeasonLoadError = true;

            })


            .addCase(createAds.pending, (state, action) => {
                state.createAdsLoading = true;
                state.createAdsLoaded = false;
                state.createAdsLoadError = false;
            })

            .addCase(createAds.fulfilled, (state, action) => {
                state.createAdsLoading = false;
                state.createAdsLoaded = true;
                state.createAdsLoadError = false;
            })

            .addCase(createAds.rejected, (state, action) => {
                state.createAdsLoading = false;
                state.createAdsLoaded = false;
                state.createAdsLoadError = true;
            })


            .addCase(deleteAds.pending, (state) => {

                state.deleteAdsLoading = true;
                state.deleteAdsLoaded = false;
                state.deleteAdsLoadError = false;
            })

            .addCase(deleteAds.fulfilled, (state, action) => {

                state.deleteAdsLoading = false;
                state.deleteAdsLoaded = true;
                state.deleteAdsLoadError = false;
            })

            .addCase(deleteAds.rejected, (state, action) => {

                state.deleteAdsLoading = false;
                state.deleteAdsLoaded = false;
                state.deleteAdsLoadError = true;

            })

            .addCase(updateAds.pending, (state) => {

                state.updateAdsLoading = true;
                state.updateAdsLoaded = false;
                state.updateAdsLoadError = false;
            })

            .addCase(updateAds.fulfilled, (state, action) => {

                state.updateAdsLoading = false;
                state.updateAdsLoaded = true;
                state.updateAdsLoadError = false;
            })

            .addCase(updateAds.rejected, (state, action) => {

                state.updateAdsLoading = false;
                state.updateAdsLoaded = false;
                state.updateAdsLoadError = true;

            })



            //Get all roles
            .addCase(getAllRoles.pending, (state, action) => {
                state.isAllRolesLoading = true;
                state.isAllRolesLoaded = false;
                state.isAllRolesLoadError = false;
            })

            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.isAllRolesLoading = false;
                state.isAllRolesLoaded = true;
                state.isAllRolesLoadError = false;
                state.allRoles = action.payload;
            })

            .addCase(getAllRoles.rejected, (state, action) => {
                state.isAllRolesLoading = false;
                state.isAllRolesLoaded = false;
                state.isAllRolesLoadError = true;
            })

            //Get company approvals
            .addCase(getPendingCompanyApprovals.pending, (state, action) => {
                state.isPendingCompanyApprovalLoading = true;
                state.isPendingCompanyApprovalLoaded = false;
                state.isPendingCompanyApprovalLoadError = false;
            })

            .addCase(getPendingCompanyApprovals.fulfilled, (state, action) => {
                state.isPendingCompanyApprovalLoading = false;
                state.isPendingCompanyApprovalLoaded = true;
                state.isPendingCompanyApprovalLoadError = false;
                state.pendingCompanyApprovals = action.payload;
            })

            .addCase(getPendingCompanyApprovals.rejected, (state, action) => {
                state.isPendingCompanyApprovalLoading = false;
                state.isPendingCompanyApprovalLoaded = false;
                state.isPendingCompanyApprovalLoadError = true;
            })
    }
})

export default adminSlice.reducer