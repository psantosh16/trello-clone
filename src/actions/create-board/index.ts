"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/hooks/useAction";
import { InputType, OutputType } from "./type";

const handler = async (
  data: InputType
): Promise<ActionState<InputType, OutputType>> => {
  const { orgId, userId } = auth();

   console.clear();
  if (!orgId || !userId || orgId === undefined || userId === undefined) {
    return {
      error: "Organization or user not found",
    };
  }

  if (!data || data === undefined || data === null) { 
    return {
      error: "Data is missing",
    };
  }

  const { title, image } = data;

  if (!title || !image || title === undefined || image === undefined || title === "" || image === "") {
    return {
      error: "Title or image is missing",
    };
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;
  try {
    throw new Error("Not implemented");
    // board = await db.board.create({
    //   data: {
    //     title,
    //     orgId,
    //     imageId,
    //     imageThumbUrl,
    //     imageFullUrl,
    //     imageLinkHtml,
    //     imageUserName,
    //   },
    // });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/boards/${board.id}`);

  return {
    data: board as OutputType,
  };
};

export const createBoard = handler;
