export type SendMessageRequestType = {
    message: string;
    enterpriseId: string;
    contacts: string;
    senderId: string;
    msisdn: string;
    smsCount: number;
}

export type SendMessageResponseType = {
    statusCode: number,
    error: string,
    message: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    version: number,
    contact: string,
    enterprise: string,
    status: ACCEPTED,
    sender: string,
    ticket: string,
    smscount: number,
    msisdn: string,
    code: string,
    codeGroupe: string,
    type: string,
    apiResponse?: string,
    archived: boolean
}


export type MessageType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    qteMessage?: number;
    messagePriceUnit?: number;
    enterprise: string;
    user?: string;
    paymentMethod?: string | 'CASH' | 'MOBILE_MONEY' | 'BANK';
    debitPhoneNumber?: string;
    debitBankAccountNumber?: string;
    couponCode?: string;
    archived: boolean;
    statusCode?: number;
    error?: string;
    message?: string;
}

export type PaginatedResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    pageable: {
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    number: number;
    size: number;
    empty: boolean;
}

export type GetMessageResponseType = PaginatedResponse<MessageType>;