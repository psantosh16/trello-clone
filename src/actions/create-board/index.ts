"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/hooks/useAction";

const handler = async ({ title }: { title: string }): Promise<ActionState> => {
  const { orgId } = auth();
  let board;

  if (!orgId) {
    return {
      success: false,
      error: "Organization not found",
    };
  }

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      success: false,
      error: "Failed to create",
    };
  }

  revalidatePath(`/boards/${title}`);
  return {
    success: true,
    data: board,
  };
};

export const createBoard = handler;
