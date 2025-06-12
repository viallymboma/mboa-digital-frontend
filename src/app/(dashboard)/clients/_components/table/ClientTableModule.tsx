import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  ContactStatisticsSvgIcon,
  UnavailableContactSvgIcon,
  WorkingContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { ClientResponseType } from '@/types/client';

import ClientTable from './ClientTable';

// import { ClientResponseType } from '@/types/clients';

export type ClientTableModuleProps = {
    clients?: ClientResponseType[];
};

const ClientTableModule: React.FC<ClientTableModuleProps> = ({ clients }) => {
    const activeClients = clients?.filter(client => !client.archived) || [];
    const archivedClients = clients?.filter(client => client.archived) || [];

    return (
        <div className='w-[100%]'>
            <div className='flex items-center gap-4 py-4'>
                <StatsCard
                    value={clients?.length.toString() || "0"}
                    label="Total Utilisateurs"
                    icon={<ContactStatisticsSvgIcon />}
                    color="black"
                    borderColor="border-primaryAppearance"
                    trend={{ value: '+ 5.5%', isPositive: true }}
                />
                <StatsCard
                    value={activeClients.length.toString()}
                    label="Utilisateurs Actifs"
                    icon={<WorkingContactSvgIcon />}
                    color="#0E8345"
                    borderColor="border-borderGreen"
                />
                <StatsCard
                    value={archivedClients.length.toString()}
                    label="Utilisateurs Archivés"
                    icon={<UnavailableContactSvgIcon />}
                    color="#DE1135"
                    borderColor="border-borderRed"
                />
            </div>

            <ClientTable clients={clients} />
        </div>
    );
};

export default ClientTableModule;










// import React from 'react';

// import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
// import {
//   ContactStatisticsSvgIcon,
//   UnavailableContactSvgIcon,
//   WorkingContactSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { ClientResponseType } from '@/types/client';

// import ClientTable from './ClientTable';

// export type ClientTableModuleProps = {
//   clients?: ClientResponseType []; // Adjust the type as per your data structure
// };

// const ClientTableModule: React.FC <ClientTableModuleProps> = ({ clients }) => {
//     return (
//         <div className=' w-[100%]'>

//             <div className='flex items-center gap-4 py-4'>
//                 <StatsCard
//                 // value="25k"
//                 value={ clients?.length || "0" } // Assuming contacts are available
//                 label="Total de contacts"
//                 icon={<ContactStatisticsSvgIcon />}
//                 color="black"
//                 borderColor="border-primaryAppearance"
//                 trend={{ value: '+ 5.5%', isPositive: true }}
//                 />
//                 <StatsCard
//                 value={ clients?.filter((client) => !client.archived).length || "0" } // Assuming archived contacts are unavailable
//                 // "2200"
//                 label="Total de contacts"
//                 icon={<WorkingContactSvgIcon />}
//                 color={"#0E8345"}
//                 borderColor="border-borderGreen"
//                 />
//                 <StatsCard
//                 value={ clients?.filter((client) => client.archived).length || "0" } // Assuming archived contacts are unavailable
//                 // value="300"
//                 label="Total de contacts"
//                 icon={<UnavailableContactSvgIcon />}
//                 color="#DE1135"
//                 borderColor="border-borderRed"
//                 />
//             </div>

//             <ClientTable clients={ clients } />

//         </div>
//     )
// }

// export default ClientTableModule