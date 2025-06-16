import {
  Gender,
  Role,
} from './auth';

export type CreateClientRequestType = {
    firstName: string;
    lastName: string;
    socialRaison: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    city: string;
    activityDomain: string;
    address: string;
    contribuableNumber: string;
    villeEntreprise: string;
    numeroCommerce: string;
    urlImage?: string;
    urlSiteweb?: string;
    telephoneEntreprise: string;
    smsESenderId: string;
    adresseEnterprise: string;
    emailEnterprise: string;
    enterpriseCountryId: string;
    user: string;
};

// Add this interface at the top or in your types file
interface CreateClientUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    role?: 'SUPER_ADMIN' | 'ADMIN_USER' | 'USER' ;
}

export type UpdateClientRequestType = {
    socialRaison: string;
    email: string;
    password?: string;
    phoneNumber: string;
    country: string;
    city: string;
    smsSenderId: string;
    activityDomain: string;
    address: string;
    contribuableNumber: string;
    villeEntreprise: string;
    firstName: string;
    lastName: string;
    pays: string;
    user: string;
};

export type ClientResponseType = {
    statusCode: number;
    error: string | null;
    message: string | null;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    gender: Gender;
    role: Role;
    enterpriseId: string;
    archived: boolean;
    isSelected?: boolean;
};

export type TransformedClientType = Omit<ClientResponseType, 'statusCode' | 'error' | 'message' | 'updatedAt' | 'version'> & {
    status?: string;
};