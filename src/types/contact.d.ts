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

enum RechargeStatus {
    DEMANDE = "DEMANDE",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
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

// Country interface
export type PaysType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    code: string;
    nom: string;
    continent: string;
    imageUrl: string;
    enterprises: string[];
    archived: boolean;
    deleted: boolean;
}

// Recharge interface
export type RechargeType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    qteMessage: number;
    messagePriceUnit: number;
    status: RechargeStatus;
    enterprise: string;
    user: string;
    userManagedRecharge: string;
    paymentMethod: PaymentMethod;
    debitPhoneNumber: string;
    debitBankAccountNumber: string;
    couponCode: string;
    archived: boolean;
    deleted: boolean;
}

// Group interface
export type GroupType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    name: string;
    code: string;
    enterprise: string;
    enterpriseContacts: EnterpriseContactType [];
    archived: boolean;
    deleted: boolean;
}

// Enterprise Contact interface (self-referential)
export type EnterpriseContactType = {
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
    enterprise: string | EnterpriseType;
    group: string | Group;
    archived: boolean;
    deleted: boolean;
}

// Enterprise interface
export type EnterpriseType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
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
    user: string[];
    enterpriseContacts: EnterpriseContactType [];
    groupes: GroupType [];
    recharges: RechargeType [];
    archived: boolean;
    deleted: boolean;
}

// User interface
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
    role: Role;
    userEnterprise: Enterprise;
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

// Main Enterprise Contact Response interface
export type EnterpriseContactResponseType = {
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
    user: UserType;
    enterprise: EnterpriseType;
    group: GroupType;
    archived: boolean;
}
export type EnterpriseContactDTO = {
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    country: string,
    city: string,
    gender: string,
    enterpriseId: string,
    group: string
}


// Pagination Sort interface
export type SortType = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

// Pageable interface
export type PageableType = {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: Sort;
    offset: number;
}

// Main Paginated Response interface
export type PaginatedEnterpriseContactsResponseType = {
    totalPages: number;
    totalElements: number;
    pageable: PageableType;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    sort: SortType;
    number: number;
    size: number;
    content: EnterpriseContactResponseType [];
    empty: boolean;
}

export type CreateContactRequestType = {
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    country: string,
    city: string,
    gender?: Gender,
    enterpriseId: string,
    group?: string
}



