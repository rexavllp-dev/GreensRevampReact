export const orderColumns = [
    {name: 'ORDER ID', uid: 'orderId', sortable: true},
    {name: 'CUSTOMER', uid: 'ord_customer_name', sortable: true},
    {name: 'CUSTOMER PHONE', uid: 'ord_customer_phone', sortable: true},
    {name: 'DATE', uid: 'orderCreatedDate', sortable: true},
    {name: 'TOTAL', uid: 'orderSubTotal', sortable: true},
    {name: 'STATUS', uid: 'orderStatusName', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]
export const cancelledOrdersColumns = [
    {name: 'ORDER ID', uid: 'order_id', sortable: true},
    {name: 'CANCEL TYPE', uid: 'cancel_type', sortable: true},
    {name: 'CANCEL NOTE', uid: 'cancel_note', sortable: true},
    {name: 'CANCEL DATE', uid: 'created_at', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const returnedOrdersColumns = [
    {name: 'ORDER ID', uid: 'orderId', sortable: true},
    {name: 'CUSTOMER', uid: 'ord_customer_name', sortable: true},
    {name: 'CUSTOMER PHONE', uid: 'ord_customer_phone', sortable: true},
    {name: 'REASON', uid: 'returnReason', sortable: true},
    {name: 'DATE', uid: 'returnDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const replacedOrdersColumns = [
    {name: 'ORDER ID', uid: 'orderId', sortable: true},
    {name: 'CUSTOMER', uid: 'ord_customer_name', sortable: true},
    {name: 'CUSTOMER PHONE', uid: 'ord_customer_phone', sortable: true},
    {name: 'REASON', uid: 'replacementReason', sortable: true},
    {name: 'DATE', uid: 'replacementDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const outOfStockColumns = [
    {name: 'PRODUCT ID', uid: 'productId', sortable: true},

    {name: 'DATE', uid: 'replacementDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const minQtyProductColumns = [
    {name: 'PRODUCT ID', uid: 'productId', sortable: true},

    {name: 'DATE', uid: 'replacementDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const expiringProductsColumns = [
    {name: 'PRODUCT ID', uid: 'productId', sortable: true},

    {name: 'DATE', uid: 'replacementDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const expiringTradeLicensesColumn = [
    {name: 'COMPANY ID', uid: 'productId', sortable: true},
    {name: 'COMPANY NAME', uid: 'company_name', sortable: true},

    {name: 'DATE', uid: 'replacementDate', sortable: true},
    // {name: 'ACTIONS', uid: 'actions'},
]

export const companyVerificationColumns = [
    {name: 'NAME', uid: 'name', sortable: true},
    {name: 'STATUS', uid: 'status', sortable: true},
    {name: 'ACTIONS', uid: 'actions'},
]