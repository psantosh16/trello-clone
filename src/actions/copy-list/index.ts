"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { InputType, OutputType } from "./type";

const handler = async (data: InputType): Promise<OutputType> => {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id,boardId } = data;
  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: "List not found.",
      };
    }
   
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select:{ order:true },
    });

    const newOrder = lastList ? lastList.order + 1 : 0;

    list = await db.list.create({
      data: {
title: `${listToCopy.title} - Copy`,
        order: newOrder,
        boardId: listToCopy.boardId,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              decription: card.decription,
              order: card.order,
            })),
          }
        },
      },
      include: {
        cards: true,
      },
    });

  } catch (e) {
    return {
      error: "Failed to copy.",
    };
  }

  
  revalidatePath(`/board/${boardId}`);

  
  return {
    data: list,
  };
};

export const copyList = handler;