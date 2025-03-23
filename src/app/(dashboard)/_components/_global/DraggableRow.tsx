import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableRowProps {
  id: string;
  children: React.ReactNode;
}

const DraggableRow = ({ id, children }: DraggableRowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, resizeObserverConfig: {} });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </tr>
    );
};

export default DraggableRow;