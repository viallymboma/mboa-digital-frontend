import { create } from 'zustand';

import { GroupType } from '@/types/groups';

interface GroupState {
    groups: GroupType[];
    selectedGroup: GroupType | null;
    selectedGroups: string[];
    selectedGroupsData: GroupType[];
    isLoading: boolean;
    error: Error | null;
    setGroups: (groups: GroupType[]) => void;
    addGroup: (group: GroupType) => void;
    updateGroupInStore: (group: GroupType) => void;
    removeGroup: (groupId: string) => void;
    setSelectedGroup: (group: GroupType | null) => void;
    toggleGroup: (groupId: string) => void;
    clearSelectedGroups: () => void;
    setSelectedGroupsData: (groups: GroupType[]) => void;
    addSelectedGroup: (group: GroupType) => void;
    removeSelectedGroup: (groupId: string) => void;
    toggleMultipleGroups: (groups: GroupType[]) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
    groups: [],
    selectedGroup: null,
    selectedGroups: [],
    selectedGroupsData: [],
    isLoading: false,
    error: null,

    setGroups: (groups) => set({ groups }),
    
    addGroup: (group) => set((state) => ({
        groups: [group, ...state.groups]
    })),

    updateGroupInStore: (updatedGroup) => set((state) => ({
        groups: state.groups.map(group => 
            group.id === updatedGroup.id ? updatedGroup : group
        )
    })),

    removeGroup: (groupId) => set((state) => ({
        groups: state.groups.filter(group => group.id !== groupId)
    })),

    setSelectedGroup: (group) => set({ selectedGroup: group }),

    toggleGroup: (groupId) => set((state) => {
        const isSelected = state.selectedGroups.includes(groupId);
        const group = state.groups.find(g => g.id === groupId);
        
        return {
            selectedGroups: isSelected
                ? state.selectedGroups.filter(id => id !== groupId)
                : [...state.selectedGroups, groupId],
            selectedGroupsData: isSelected
                ? state.selectedGroupsData.filter(g => g.id !== groupId)
                : group 
                    ? [...state.selectedGroupsData, group]
                    : state.selectedGroupsData
        };
    }),

    clearSelectedGroups: () => set({ 
        selectedGroups: [],
        selectedGroupsData: [] 
    }),

    setSelectedGroupsData: (groups) => set({ selectedGroupsData: groups }),

    addSelectedGroup: (group) => set((state) => ({
        selectedGroupsData: [...state.selectedGroupsData, group],
        selectedGroups: [...state.selectedGroups, group.id]
    })),

    removeSelectedGroup: (groupId) => set((state) => ({
        selectedGroupsData: state.selectedGroupsData.filter(g => g.id !== groupId),
        selectedGroups: state.selectedGroups.filter(id => id !== groupId)
    })),

    toggleMultipleGroups: (groups) => set((state) => {
        const currentIds = state.selectedGroupsData.map(g => g.id);
        // const newGroupIds = groups.map(g => g.id);
        const groupsToAdd = groups.filter(g => !currentIds.includes(g.id));
        
        return {
            selectedGroupsData: [...state.selectedGroupsData, ...groupsToAdd],
            selectedGroups: [...currentIds, ...groupsToAdd.map(g => g.id)]
        };
    }),
}));