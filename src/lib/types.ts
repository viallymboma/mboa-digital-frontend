export type CountryType = {
    statusCode: number;
    error: null;
    message: null;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    code: string;
    nom: string;
    continent: string;
    imageUrl: null;
    archived: boolean;
}

export type UserType = {
    email: string;
    name: null;
    imageUrl: null;
}

export type EnterpriseType = {
    statusCode: number;
    error: null;
    message: null;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    idEnterprise: null;
    socialRaison: string;
    numeroCommerce: string;
    urlImage: string;
    urlSiteweb: string;
    telephoneEnterprise: string;
    emailEnterprise: string;
    villeEnterprise: string;
    adresseEnterprise: string;
    smsESenderId: string;
    smsCredit: number;
    activityDomain: string;
    contribuableNumber: null;
    pays: CountryType;
    user: UserType [];
    // enterpriseContacts: any[]; // Replace 'any' with a more specific type if you know the structure
    // groupes: any[]; // Replace 'any' with a more specific type if you know the structure
    // recharges: any[]; // Replace 'any' with a more specific type if you know the structure
    archived: boolean;
}

export type RechargeResponseType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    version: number;
    qteMessage: number;
    messagePriceUnit: number;
    enterprise: string;
    user: string;
    paymentMethod: 'CASH' | string; // If more methods are possible, expand union
    debitPhoneNumber: string;
    debitBankAccountNumber: string;
    couponCode: string;
    archived: boolean;
};