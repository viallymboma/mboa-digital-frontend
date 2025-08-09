// types/company.ts
import {
  Gender,
  PaymentMethod,
  RechargeStatus,
  Role,
} from '@/types/contact'; // Reuse existing enums

// Reusing types from contact.ts where applicable
export type PaysType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  code: string;
  nom: string;
  continent: string;
  imageUrl: string;
  archived: boolean;
  deleted?: boolean;
};

export type UserType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  email: string;
  phoneNumber: string;
  password?: string;
  country: string;
  city: string;
  address?: string;
  role: Role;
  firstName: string;
  lastName: string;
  enterpriseId?: string;
  archived: boolean;
  deleted?: boolean;
};

export type RechargeType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  qteMessage: number;
  messagePriceUnit: number;
  status: RechargeStatus;
  enterprise: string;
  user?: string;
  userManagedRecharge?: string;
  paymentMethod: PaymentMethod;
  debitPhoneNumber: string;
  debitBankAccountNumber: string;
  couponCode: string;
  archived: boolean;
  deleted?: boolean;
};

export type GroupType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  name: string;
  code: string;
  enterprise: string;
  enterpriseContacts: EnterpriseContactType[];
  archived: boolean;
  deleted?: boolean;
};

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
  group?: string | GroupType;
  archived: boolean;
  deleted?: boolean;
};

export type EnterpriseType = {
  statusCode: number;
  error: string;
  message: string;
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
  user: (UserType | string)[];
  enterpriseContacts: EnterpriseContactType[];
  groupes: GroupType[];
  recharges: RechargeType[];
  archived: boolean;
  deleted?: boolean;
};

// Request type for creating a company
export type CreateCompanyRequestType = {
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
  pays: string; // Likely a country ID
};

// Request type for adding a user to an enterprise
export type AddUserToEnterpriseRequestType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  role: Role;
};

// Paginated response type for companies
export type PaginatedCompaniesResponseType = {
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
  content: EnterpriseType[];
  empty: boolean;
};