

export type GroupType = {
    id: string;
    name: string;
    imageUrl: string;
    contactCount: number;
};


const generateGroupData = (count: number): GroupType[] => {
    const names = ['Chris Group', 'Tech Team', 'Marketing', 'Sales', 'Support', 'Design', 'Engineering', 'Finance'];
    const images = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/00FF00',
        'https://via.placeholder.com/150/0000FF',
    ];

    const data: GroupType[] = [];

    for (let i = 0; i < count; i++) {
        data.push({
            id: `group-${i}`,
            name: names[Math.floor(Math.random() * names.length)],
            imageUrl: images[Math.floor(Math.random() * images.length)],
            contactCount: Math.floor(Math.random() * 1000) + 500, // Random contact count between 500 and 1500
        });
    }

    return data;
};

// Example usage
export const groupData: GroupType[] = generateGroupData(20); // Generate 8 groups