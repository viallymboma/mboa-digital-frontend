import { GroupType } from '@/types/groups';

import { ApiService } from './data.service';

export class GroupService {
    private static instance: GroupService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): GroupService {
        if (!GroupService.instance) {
            GroupService.instance = new GroupService();
        }
        return GroupService.instance;
    }

    async getGroups() {
        return this.apiService.get<GroupType[]>(`/api/v1/group/all`);
    }

    async getGroupByEnterprise(enterpriseId: string) {
        return this.apiService.get<GroupType[]>(`/api/v1/group/all/${enterpriseId}`);
    }

    async createGroup(data: Partial<GroupType>) {
        return this.apiService.post<GroupType, Partial<GroupType>>('/api/v1/group/save', data);
    }

    async updateGroup(groupId: string, data: Partial<GroupType>) {
        return this.apiService.put<GroupType, Partial<GroupType>>(`/api/v1/group/${groupId}`, data);
    }

    async deleteGroup(groupId: string) {
        return this.apiService.delete(`/api/v1/group/${groupId}`);
    }

    async addContactsToGroup(groupId: string, contactIds: string[]) {
        return this.apiService.post<GroupType, { contactIds: string[] }>(
            `/api/v1/group/addContact/${groupId}`,
            { contactIds }
        );
    }

    async removeContactFromGroup(groupId: string) {
        return this.apiService.delete(`/api/v1/group/deleteContact/${groupId}`);
    }
}