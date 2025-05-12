// Enum for PaymentMethod
enum PaymentMethod {
    CASH = "CASH",
    MOBILE_MONEY = "MOBILE_MONEY",
    BANK_TRANSFER = "BANK_TRANSFER",
    CREDIT_CARD = "CREDIT_CARD"
}

// Type for Sort properties
export type SortType = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

// Type for Pageable
export type PageableType = {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: SortType;
    offset: number;
}

// Type for a Recharge item
export type RechargeType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    version: number;
    qteMessage: number; // Quantity of messages
    messagePriceUnit: number; // Price per message unit
    enterprise: string; // Could be expanded to Enterprise interface if needed
    user: string; // Could be expanded to User interface if needed
    paymentMethod: PaymentMethod;
    debitPhoneNumber: string;
    debitBankAccountNumber: string;
    couponCode: string;
    archived: boolean;
}

// Main Paginated Response Interface
export type PaginatedRechargeResponseType = {
    totalPages: number;
    totalElements: number;
    pageable: PageableType;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    sort: SortType;
    number: number; // current page number
    size: number;   // page size
    content: RechargeType [];
    empty: boolean;
}