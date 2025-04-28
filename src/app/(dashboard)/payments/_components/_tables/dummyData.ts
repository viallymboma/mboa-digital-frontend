export enum MoneyTransferOperator {
  ORANGE_MONEY = 'Orange Money',
  MTN_MOBILE_MONEY = 'MTN Mobile Money',
}

export type PaymentsType = {
  id?: string;
  receiverName: string;
  receiverContact: string;
  transactionID: string;
  dateTime: string;
  operatorMoneyTransfer: MoneyTransferOperator;
  numberOfSms: number;
  amount: number;
  cost: number;
  status: string;
  actions: string;
};

// Utility function to generate random data
const generatePaymentRandomData = (count: number): PaymentsType[] => {
  const names = [
    'John Doe',
    'Jane Smith',
    'Robert Johnson',
    'Emily Davis',
    'Michael Wilson',
  ];
  const phoneNumbers = [
    '+237647394394',
    '+237840924395',
    '+237658384748',
    '+237648898480',
    '+237621482109',
  ];
  const statuses = ['Completed', 'Failed', 'Pending', 'Processing'];
  const actions = ['☒', '✓', '✗', '⚠', '✎'];

  const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const data: PaymentsType[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: `recharge-${i}`,
      receiverName: names[Math.floor(Math.random() * names.length)],
      receiverContact: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
      transactionID: `TRX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      dateTime: randomDate(new Date(2023, 0, 1), new Date()),
      operatorMoneyTransfer: Math.random() > 0.5 
        ? MoneyTransferOperator.ORANGE_MONEY 
        : MoneyTransferOperator.MTN_MOBILE_MONEY,
      numberOfSms: Math.floor(Math.random() * 100) + 1,
      amount: Math.floor(Math.random() * 50000) + 1000,
      cost: Math.floor(Math.random() * 1000) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      actions: actions[Math.floor(Math.random() * actions.length)],
    });
  }

  return data;
};

// Generate and export the dummy data
export const dummyPaymentsData = generatePaymentRandomData(50);