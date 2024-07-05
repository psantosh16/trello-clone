"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBoard = async ({ title }: { title: string }) => {
  /* 
      This function creates a [new board] in the Postgree SQL database.
  */
  try {
    await db.board.create({
      data: {
        title: title,
      },
    });
  } catch (e) {
    return {
      error: "Database error",
    };
  }

  revalidatePath("/organization/org_2ioy4gFwvgjZHJDNLKKQvewSNkj");
  redirect("/organization/org_2ioy4gFwvgjZHJDNLKKQvewSNkj");
};
