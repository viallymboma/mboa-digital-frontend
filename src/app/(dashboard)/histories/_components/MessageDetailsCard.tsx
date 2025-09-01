import React from 'react';

import { useTranslations } from 'next-intl';

interface MessageDetailsProps {
  dateTime: string;
  smsUsedCount: number;
  receiverContact: string[];
  messageContent: string;
  status: string;
}

const MessageDetailsCard: React.FC<MessageDetailsProps> = ({
  dateTime,
  smsUsedCount,
  receiverContact,
  messageContent,
  status,
}) => {
  const t = useTranslations('histories');
  return (
    <div className="bg-white w-full relative">
      <div className="border-2 border-purple-500 rounded-xl p-4 bg-gray-100 relative">
        <p className="text-purple-700 font-bold text-lg mb-2 pb-2">
          {t('messageDetails.smsSending')} | <span className="font-normal text-gray-700">{dateTime}</span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">{t('messageDetails.smsUsedCount')}:</span>
          <span className="text-purple-700 font-bold"> {smsUsedCount}</span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">{t('messageDetails.recipient')}:</span>
          <span className="text-purple-700 font-bold"> {receiverContact.join(', ')}</span>
        </p>
        <div className="rounded-lg p-3 mt-4 text-[14px] bg-white">
          {messageContent}
        </div>
        <div className="mt-4">
          <button className="px-4 py-1 text-sm font-bold text-white bg-green-600 rounded-lg shadow-md">
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailsCard;
