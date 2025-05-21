import { useCallback } from 'react';

import useSWR from 'swr';

import { notify } from '@/components/utilities/helper';
import { GroupService } from '@/services/group.service';
import { useGroupStore } from '@/stores/groups.store';
import { GroupType } from '@/types/groups';

// import { notify } from '@/lib/utils';
import useGetLocalStorage from './useGetLocalStorage';

export function useGroups() {
    const { getLocalStorage } = useGetLocalStorage();
    const groupService = GroupService.getInstance();
    const { setGroups, addGroup, updateGroupInStore, removeGroup } = useGroupStore();

    // Get user's enterprise ID from localStorage
    const user = getLocalStorage("user");
    const enterpriseId = user?.enterprise?.id;

    const { data, error, isLoading, mutate } = useSWR(
        enterpriseId ? `/api/v1/group/all/${enterpriseId}` : null,
        async () => {
            try {
                const response = await groupService.getGroupByEnterprise(enterpriseId!);
                setGroups(response);
                return response;
            } catch (error) {
                console.error('Error fetching groups:', error);
                throw error;
            }
        }
    );

    const createGroup = useCallback(async (groupData: Partial<GroupType>) => {
        try {
            const response = await groupService.createGroup({
                ...groupData,
                enterprise: enterpriseId
            });
            addGroup(response);
            notify.success('Group created successfully');
            return response;
        } catch (error) {
            console.error('Error creating group:', error);
            notify.error('Failed to create group');
            throw error;
        }
    }, [enterpriseId]);

    const updateGroup = useCallback(async (groupId: string, groupData: Partial<GroupType>) => {
        try {
            const response = await groupService.updateGroup(groupId, groupData);
            updateGroupInStore(response);
            notify.success('Group updated successfully');
            return response;
        } catch (error) {
            console.error('Error updating group:', error);
            notify.error('Failed to update group');
            throw error;
        }
    }, []);

    const deleteGroup = useCallback(async (groupId: string) => {
        try {
            await groupService.deleteGroup(groupId);
            removeGroup(groupId);
            notify.success('Group deleted successfully');
        } catch (error) {
            console.error('Error deleting group:', error);
            notify.error('Failed to delete group');
            throw error;
        }
    }, []);

    const addContactsToGroup = useCallback(async (groupId: string, contactIds: string[]) => {
        try {
            const response = await groupService.addContactsToGroup(groupId, contactIds);
            updateGroupInStore(response);
            notify.success('Contacts added to group successfully');
            return response;
        } catch (error) {
            console.error('Error adding contacts to group:', error);
            notify.error('Failed to add contacts to group');
            throw error;
        }
    }, []);

    const removeContactFromGroup = useCallback(async (groupId: string) => {
        try {
            const response = await groupService.removeContactFromGroup(groupId) as GroupType;
            updateGroupInStore(response);
            notify.success('Contact removed from group successfully');
            return response;
        } catch (error) {
            console.error('Error removing contact from group:', error);
            notify.error('Failed to remove contact from group');
            throw error;
        }
    }, []);

    const refetchGroups = useCallback(() => {
        return mutate();
    }, [mutate]);

    return {
        groups: data || [],
        isLoading,
        error,
        createGroup,
        updateGroup,
        deleteGroup,
        addContactsToGroup,
        removeContactFromGroup,
        refetchGroups
    };
}