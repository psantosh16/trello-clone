"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "../../../../../../../types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // if dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // User moves list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => {
          return {
            ...item,
            index,
          };
        }
      );
      setOrderedData(items);
      // TODO: save changes to server
    }

    // User moves card
    if (type === "card") {
      let newList = [...orderedData];

      const sourceList = newList.find((list) => list.id === source.droppableId);
      const destList = newList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // if no cards in source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // if no cards in dest list
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving card within same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newList);
        // TODO: save changes to server
      } else {
        // Moving card to different list
        const [moveCard] = sourceList.cards.splice(source.index, 1);
        moveCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, moveCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newList);
        // TODO: save changes to server
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"lists"} type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
