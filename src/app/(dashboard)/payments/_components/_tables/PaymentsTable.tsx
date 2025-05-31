import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';

import { dummyPaymentsData } from './dummyData';
import { paymentsColumns } from './PaymentsTableElements';

const PaymentsTable = () => {

  const [data, setData] = React.useState(dummyPaymentsData);

  const handleReorder = (reorderedData: typeof dummyPaymentsData) => {
    setData(reorderedData); // Update the data state
  };

  return (
    <GenericTable
      data={data}
      columns={paymentsColumns}
      title="Payment Transactions"
      description="List of all recharge transactions"
      defaultPageSize={7}
      // onEdit={(row) => console.log('Edit:', row)}
      // onDelete={(row) => console.log('Delete:', row)}
      onReorder={handleReorder}
    />
  );
};

export default PaymentsTable;
