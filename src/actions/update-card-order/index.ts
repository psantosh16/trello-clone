"use server";
import { InputType, OutputType } from "./type";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let updatedCard;

  try {
    const transaction = items.map((item) => {
      return db.card.update({
        where: {
          id: item.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: item.order,
          listId: item.listId,
        },
      });
    });

    updatedCard = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedCard,
  };
};

export const UpdateCardOrder = handler;
