"use server";

import { db } from "@/lib/db";
import { ActionState } from "@/hooks/useAction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InputType, OutputType } from "./type";

const handler = async (data: InputType): Promise<OutputType> => {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (e) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  return {
    data: board,
  };
};

export const deleteBoard = handler;
