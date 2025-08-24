import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import ModuleItem from './ModuleItem';

const DraggableItem = ({ 
  item, 
  index,
  onDelete,
  onMoveItem,
  onRename
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { 
      id: item.id, 
      index, 
      moduleId: item.moduleId,
      type: 'item'
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover: (draggedItem) => {
      if (draggedItem.id !== item.id) {
        onMoveItem(draggedItem, index, item.moduleId);
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`draggable-item ${isDragging ? 'dragging' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(1deg)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <ModuleItem
        item={item}
        onDelete={onDelete}
        onRename={onRename}
      />
    </div>
  );
};

export default DraggableItem;
