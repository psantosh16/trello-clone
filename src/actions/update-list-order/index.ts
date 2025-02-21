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

  const { boardId, items } = data;
  let lists;

  try {
    const transaction = items.map((item) => {
      return db.list.update({
        where: {
          id: item.id,
          board: {
            orgId,
          },
        },
        data: {
          order: item.order,
        },
      });
    });

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: lists,
  };
};

export const UpdateListOrder = handler;
