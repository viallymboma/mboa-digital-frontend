

// Define the data type
export type HistoriesType = {
  id?: string; // Add an id field
  content: string;
  receivers: string [];
  date: string;
  smsUsedCount: number;
  cost: string;
  status: string;
  actions: string;
};


// Utility function to generate random data

const generateRandomData = (count: number): HistoriesType[] => {
  const contents = [
    'Welcome to our service!',
    'Your account has been updated.',
    'Reminder: Payment due soon.',
    'New features are now available.',
    'Thank you for your purchase!',
  ];
  const phoneNumbers = [
    '+1234567890',
    '+2345678901',
    '+3456789012',
    '+4567890123',
    '+5678901234',
  ];
  const statuses = ['Sent', 'Failed', 'Pending', 'Delivered', 'Draft'];
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

  const data: HistoriesType[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a random list of phone numbers for receivers
    const receivers = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)]
    );

    data.push({
      id: `row-${i}`, // Add a unique id
      content: contents[Math.floor(Math.random() * contents.length)],
      receivers, // Random list of phone numbers
      date: randomDate(new Date(2020, 0, 1), new Date()), // Random date and time between 2020 and now
      smsUsedCount: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
      cost: `$${(Math.random() * 50).toFixed(2)}`, // Random cost between $0.00 and $50.00
      status: statuses[Math.floor(Math.random() * statuses.length)],
      actions: actions[Math.floor(Math.random() * actions.length)],
    });
  }

  return data;
};

// Example usage
export const dummyHistoriesData: HistoriesType[] = generateRandomData(20); // Generate 20 random rows