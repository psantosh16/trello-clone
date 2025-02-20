"use client";

import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  data: any;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          key={index}
          className="rounded-md bg-white shadow-sm text-sm p-2 truncate border-2 border-transparent hover:border-slate-900  py-2 px-3"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
