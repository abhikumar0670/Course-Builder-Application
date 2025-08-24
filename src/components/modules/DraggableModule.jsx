import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import ModuleCard from './ModuleCard';

const DraggableModule = ({ 
  module, 
  index,
  items,
  onEdit,
  onDelete,
  onAddItem,
  onDeleteItem,
  onRenameItem,
  onMoveModule,
  onMoveItem
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'module',
    item: { id: module.id, index, type: 'module' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'module',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMoveModule(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`draggable-module ${isDragging ? 'dragging' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(2deg)' : 'none',
      }}
    >
      <ModuleCard
        module={module}
        items={items}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        onRenameItem={onRenameItem}
        onMoveItem={onMoveItem}
      />
    </div>
  );
};

export default DraggableModule;
