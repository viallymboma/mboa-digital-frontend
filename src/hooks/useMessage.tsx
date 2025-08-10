import { useCallback } from 'react';

import useSWR from 'swr';

import { notify } from '@/components/utilities/helper';
import { MessageService } from '@/services/message.service';
import { useMessageStore } from '@/stores/message.store';
import { SendMessageRequestType } from '@/types/messages';

import useGetLocalStorage from './useGetLocalStorage';

export function useMessages(page = 0, size = 10) {
    const { getLocalStorage } = useGetLocalStorage();
    const messageService = MessageService.getInstance();
    const { 
        setMessages, 
        addMessage, 
        setTotalPages, 
        setCurrentPage, 
        setTotalElements 
    } = useMessageStore();

    const user = getLocalStorage("user");
    const enterpriseId = user?.enterprise?.id;

    const { data, error, isLoading, mutate } = useSWR(
        enterpriseId ? `/api/v1/message/${enterpriseId}/all?page=${page}&size=${size}` : null,
        async () => {
            try {
                const response = await messageService.getMessages(enterpriseId!, page, size);
                setMessages(response.content);
                setTotalPages(response.totalPages);
                setCurrentPage(response.pageable.pageNumber);
                setTotalElements(response.totalElements);
                return response;
            } catch (error) {
                console.error('Error fetching messages:', error);
                throw error;
            }
        }
    );

    console.log(data, "Fetched messages data");

    const sendMessage = useCallback(async (message: string, contacts: string[]) => {
        try {
            let messageData: SendMessageRequestType = {
                message,
                enterpriseId: enterpriseId!,
                contacts: contacts.join(','),
                senderId: user?.enterprise?.smsESenderId || '',
                msisdn: user?.id || '',
                smsCount: Math.ceil(message.length / 160)
            };
            if (user?.id) {
                messageData = {
                    message,
                    enterpriseId: enterpriseId!,
                    contacts: contacts.join(','),
                    senderId: user?.enterprise?.smsESenderId || '',
                    msisdn: user?.id || '',
                    smsCount: Math.ceil(message.length / 160)
                };
            }

            console.log(user, messageData, "let us check")

            const response = await messageService.sendMessage(messageData);
            addMessage(response);
            notify.success('Message sent successfully');
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            notify.error('Failed to send message');
            throw error;
        }
    }, [enterpriseId, user]);

    return {
        messages: data?.content || [],
        totalPages: data?.totalPages || 0,
        currentPage: data?.pageable.pageNumber || 0,
        totalElements: data?.totalElements || 0,
        isLoading,
        error,
        sendMessage,
        refetch: mutate
    };
}