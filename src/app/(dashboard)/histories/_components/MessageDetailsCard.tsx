import React from 'react';

interface MessageDetailsProps {
  dateTime: string;
  smsUsedCount: number;
  receiverContact: string[];
  messageContent: string;
  status: string;
//   cost: number;
}

const MessageDetailsCard: React.FC<MessageDetailsProps> = ({
  dateTime,
  smsUsedCount,
  receiverContact,
  messageContent,
  status,
//   cost,
}) => {
  return (
    <div className="bg-white w-full relative">
      {/* Message Box */}
      <div className="border-2 border-purple-500 rounded-xl p-4 bg-gray-100 relative">
        {/* Message Header */}
        <p className="text-purple-700 font-bold text-lg mb-2 pb-2">
          Envoi de sms | <span className="font-normal text-gray-700">{dateTime}</span>
        </p>

        {/* Message Details */}
        <p className="text-gray-700">
          <span className="font-medium">Nombre de sms Utilisés :</span>
          <span className="text-purple-700 font-bold"> {smsUsedCount}</span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Destinataire :</span>
          <span className="text-purple-700 font-bold"> {receiverContact.join(', ')}</span>
        </p>

        {/* Message Text Box */}
        <div className="rounded-lg p-3 mt-4 text-[14px] bg-white">
          {messageContent}
        </div>

        {/* Status Button */}
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

























// import React from 'react';

// // import { X } from 'lucide-react';

// const MessageDetailsCard = () => {
//     return (
//         <div className="bg-white w-full relative">
//             {/* Title */}
//             {/* <h2 className="text-2xl font-bold mb-4">Détails du message</h2> */}
//             {/* Message Box */}
//             <div className="border-2 border-purple-500 rounded-xl p-4 bg-gray-100 relative">
//                 {/* Message Header */}
//                 <p className="text-purple-700 font-bold text-lg mb-2  pb-2">
//                     {/* border-dotted border-b-2 border-purple-500 */}
//                     Envoi de sms | <span className='font-normal text-gray-700'>24-08-2024 | 11:25 AM</span> 
//                 </p>

//                 {/* Message Details */}
//                 <p className="text-gray-700">
//                 <span className="font-medium">Nombre de sms Utilisés :</span> 
//                 <span className="text-purple-700 font-bold"> 1</span>
//                 </p>
//                 <p className="text-gray-700">
//                 <span className="font-medium">Destinataire</span> 
//                 <span className="text-purple-700 font-bold"> 681 29 16 58</span>
//                 </p>

//                 {/* Message Text Box */}
//                 <div className=" rounded-lg p-3 mt-4 text-[14px] bg-white">
//                 {/* border-dotted border-2 border-purple-500 */}
//                 Merci pour ta confiance, je ne te décevrai pas, Mini Chris
//                 </div>

//                 {/* Status Button */}
//                 <div className="mt-4">
//                 <button className="px-4 py-1 text-sm font-bold text-white bg-green-600 rounded-lg shadow-md">
//                     Effectuée
//                 </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MessageDetailsCard;
