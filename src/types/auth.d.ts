// Enums for fixed value sets
enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER"
}

enum PaymentMethod {
    CASH = "CASH",
    MOBILE_MONEY = "MOBILE_MONEY",
    BANK_TRANSFER = "BANK_TRANSFER",
    CREDIT_CARD = "CREDIT_CARD"
}

// Authority interface
export type AuthorityType = {
    authority: string;
}

// Simplified User interface for nested arrays
export type BasicUserType = {
    email: string;
    name: string;
    imageUrl: string;
}

// Country interface
export type PaysType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    code: string;
    nom: string;
    continent: string;
    imageUrl: string;
    archived: boolean;
}

// Recharge interface
export type RechargeType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    qteMessage: number;
    messagePriceUnit: number;
    enterprise: string;
    user: string;
    paymentMethod: PaymentMethod;
    debitPhoneNumber: string;
    debitBankAccountNumber: string;
    couponCode: string;
    archived: boolean;
}

// Group interface
export type GroupType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    groupId: string;
    name: string;
    code: string;
    enterpriseContacts: EnterpriseContactType [];
    archived: boolean;
}

// Enterprise Contact interface
export type EnterpriseContactType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    gender: Gender;
    user: User;
    enterprise: EnterpriseType;
    group: Group;
    archived: boolean;
}

// Enterprise interface
export type EnterpriseType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    idEnterprise: string;
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
    contribuableNumber: string;
    pays: PaysType;
    user: BasicUserType [];
    enterpriseContacts: EnterpriseContactType [];
    groupes: GroupType [];
    recharges: RechargeType [];
    archived: boolean;
}

// Full User interface
export type UserType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    email: string;
    phoneNumber: string;
    password: string;
    country: string;
    city: string;
    address: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    userEnterprise: EnterpriseType;
    recharges: RechargeType [];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    username: string;
    authorities: AuthorityType [];
    enabled: boolean;
    archived: boolean;
    deleted: boolean;
}

// Main Authentication Response interface
export type LoginResponse = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    token: string;
    refreshToken: string;
    expirationTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    gender: Gender;
    role: Role;
    userEnterprise: EnterpriseType;
    archived: boolean;
}