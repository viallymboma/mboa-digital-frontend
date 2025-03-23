

// Define the data type
export type ContactType = {
  id?: string; // Add an id field
  name: string;
  city: string;
  type: string;
  date: string;
  phone: string;
  status: string;
  actions: string;
};

// Sample data
export const dummyData: ContactType[] = [
    {
      name: 'Kaeyros Analytics',
      city: 'Kaeyros Analytics',
      type: 'Orange',
      date: '15-08-2023',
      phone: 'Orange money',
      status: 'Correct',
      actions: '☒',
    },
    {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
      {
        name: 'Kaeyros Analytics',
        city: 'Kaeyros Analytics',
        type: 'Orange',
        date: '15-08-2023',
        phone: 'Orange money',
        status: 'Correct',
        actions: '☒',
      },
    // Add more rows as needed
];


// Utility function to generate random data

const generateRandomData = (count: number): ContactType[] => {
  const names = ['Kaeyros Analytics', 'Tech Corp', 'Global Solutions', 'Innovate Inc', 'Data Works'];
  const cities = ['New York', 'Paris', 'London', 'Berlin', 'Tokyo'];
  const types = ['Orange', 'Green', 'Blue', 'Red', 'Yellow'];
  const statuses = ['Correct', 'Incorrect', 'Pending', 'Completed', 'Failed'];
  const phones = ['Orange money', 'MTN money', 'Airtel money', 'Moov money', 'Vodafone money'];
  const actions = ['☒', '✓', '✗', '⚠', '✎'];

  const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };

  const data: ContactType[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: `row-${i}`, // Add a unique id
      name: names[Math.floor(Math.random() * names.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      type: types[Math.floor(Math.random() * types.length)],
      date: randomDate(new Date(2020, 0, 1), new Date()), // Random date between 2020 and now
      phone: phones[Math.floor(Math.random() * phones.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      actions: actions[Math.floor(Math.random() * actions.length)],
    });
  }

  return data;
};

// Example usage
export const dummyDataReal: ContactType[] = generateRandomData(20); // Generate 20 random rows


// const generateRandomData = (count: number): ContactType[] => {
//   const names = ['Kaeyros Analytics', 'Tech Corp', 'Global Solutions', 'Innovate Inc', 'Data Works'];
//   const cities = ['New York', 'Paris', 'London', 'Berlin', 'Tokyo'];
//   const types = ['Orange', 'Green', 'Blue', 'Red', 'Yellow'];
//   const statuses = ['Correct', 'Incorrect', 'Pending', 'Completed', 'Failed'];
//   const phones = ['Orange money', 'MTN money', 'Airtel money', 'Moov money', 'Vodafone money'];
//   const actions = ['☒', '✓', '✗', '⚠', '✎'];

//   const randomDate = (start: Date, end: Date): string => {
//     const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//     return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
//   };

//   const data: ContactType[] = [];

//   for (let i = 0; i < count; i++) {
//     data.push({
//       name: names[Math.floor(Math.random() * names.length)],
//       city: cities[Math.floor(Math.random() * cities.length)],
//       type: types[Math.floor(Math.random() * types.length)],
//       date: randomDate(new Date(2020, 0, 1), new Date()), // Random date between 2020 and now
//       phone: phones[Math.floor(Math.random() * phones.length)],
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       actions: actions[Math.floor(Math.random() * actions.length)],
//     });
//   }

//   return data;
// };

// // Example usage
// export const dummyDataReal: ContactType[] = generateRandomData(20); // Generate 20 random rows