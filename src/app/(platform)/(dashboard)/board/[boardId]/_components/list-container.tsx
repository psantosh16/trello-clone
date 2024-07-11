"use client";

import { useEffect, useState } from "react";
import { ListWithCards } from "../../../../../../../types";
import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol>
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};
