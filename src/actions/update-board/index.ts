"use server";

import { ActionState } from "@/hooks/useAction";
import { InputType, OutputType } from "./type";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const handler = async (
  data: InputType
): Promise<ActionState<InputType, OutputType>> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id } = data;
  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }
  revalidatePath(`/board/${id}`);
  return {
    data: board as OutputType,
  };
};

export const updateBoard = handler;
