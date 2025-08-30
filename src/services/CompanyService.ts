import {
  AddUserToEnterpriseRequestType,
  CreateCompanyRequestType,
  EnterpriseType,
  PaginatedCompaniesResponseType,
} from '@/types/company';
import {
  EnterpriseContactResponseType,
  UserType,
} from '@/types/contact';

import { ApiService } from './data.service';

export class CompanyService {
  private static instance: CompanyService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
  }

  async getCompanies(): Promise<EnterpriseType[]> {
    try {
      const response = await this.apiService.get<EnterpriseType[]>('/api/v1/enterprise/all');
      return response;
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      throw new Error('Unable to retrieve companies');
    }
  }

  async getCompaniesPaginated(page: number = 0, size: number = 10): Promise<PaginatedCompaniesResponseType> {
    try {
      return await this.apiService.get<PaginatedCompaniesResponseType>('/api/v1/enterprise/all', {
        page,
        size,
      });
    } catch (error) {
      console.error('Failed to fetch paginated companies:', error);
      throw new Error('Unable to retrieve paginated companies');
    }
  }

  async createCompany(company: CreateCompanyRequestType): Promise<EnterpriseType> {
    try {
      return await this.apiService.post<EnterpriseType>('/api/v1/enterprise', company);
    } catch (error) {
      console.error('Failed to create company:', error);
      throw new Error('Failed to create company');
    }
  }

  async addUserToEnterprise(enterpriseId: string, user: AddUserToEnterpriseRequestType): Promise<UserType> {
    try {
      return await this.apiService.post<UserType>(
        `/api/v1/enterprise/adduser-enterprise/${enterpriseId}`,
        user
      );
    } catch (error) {
      console.error('Failed to add user to enterprise:', error);
      throw new Error('Failed to add user to enterprise');
    }
  }


  async getCompanyContacts(enterpriseId: string, role: string): Promise<EnterpriseContactResponseType[]> {
    try {
      console.log('with role:', role);
      return await this.apiService.get<EnterpriseContactResponseType[]>(`/api/v1/contact/all/${enterpriseId}`);
    } catch (error) {
      console.error('Failed to fetch company contacts:', error);
      throw new Error('Unable to retrieve company contacts');
    }
  }

  async getUpdatedCompanyInfo(userId: string): Promise<EnterpriseContactResponseType[]> {
    try {
      return await this.apiService.get<EnterpriseContactResponseType[]>(`/api/v1/enterprise/${userId}`);
    } catch (error) {
      console.error('Failed to fetch company contacts:', error);
      throw new Error('Unable to retrieve company contacts');
    }
  }

  async updateCompany(id: string, company: CreateCompanyRequestType): Promise<EnterpriseType> {
    try {
      return await this.apiService.put<EnterpriseType>(`/api/v1/enterprise/${id}`, company);
    } catch (error) {
      console.error('Failed to update company:', error);
      throw new Error('Failed to update company');
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      await this.apiService.delete(`/api/v1/enterprise/${id}`);
    } catch (error) {
      console.error('Failed to delete company:', error);
      throw new Error('Failed to delete company');
    }
  }
}
