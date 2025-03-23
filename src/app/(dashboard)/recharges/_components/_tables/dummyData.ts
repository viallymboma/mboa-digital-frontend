

// Define the data type
export type RechargesType = {
  id?: string; // Add an id field
  receiverName: string;
  receiverContact: string;
  operator: string;
  date: string;
  creditSms: number;
  cost: number;
  creditSmsSum: number;
  status: string;
  actions: string;
};


// Utility function to generate random data

const generateRandomData = (count: number): RechargesType[] => {
  const receiverNames = [
    'Ariel Mboma ',
    'Eric Mbala',
    'Iddriss Tchoffo',
    'Moussa Sow',
    'Marie Ngo',
  ];
  const receiverContacts = [
    '+1234567890',
    '+2345678901',
    '+3456789012',
    '+4567890123',
    '+5678901234',
  ];
  const operators = ['Orange', 'MTN', 'Airtel', 'Moov', 'Vodafone'];
  const statuses = ['Success', 'Failed', 'Pending'];
  const actions = ['☒', '✓', '✗', '⚠', '✎'];

  const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // Format as "DD/MM/YYYY HH:MM"
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    });
  };

  const data: RechargesType[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: `recharge-${i}`, // Add a unique id
      receiverName: receiverNames[Math.floor(Math.random() * receiverNames.length)],
      receiverContact: receiverContacts[Math.floor(Math.random() * receiverContacts.length)],
      operator: operators[Math.floor(Math.random() * operators.length)],
      date: randomDate(new Date(2020, 0, 1), new Date()), // Random date between 2020 and now
      creditSms: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
      cost: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
      creditSmsSum: Math.floor(Math.random() * 1000) + 100, // Random number between 100 and 1000
      status: statuses[Math.floor(Math.random() * statuses.length)],
      actions: actions[Math.floor(Math.random() * actions.length)],
    });
  }

  return data;
};

// Example usage
export const dummyRechargesData: RechargesType[] = generateRandomData(20); // Generate 20 random rows