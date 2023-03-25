import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-red-300 h-10 w-10">
      {props.children}
    </div>
  );
};
