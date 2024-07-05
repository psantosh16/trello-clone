"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteBoard = async ({ id }: { id: string }) => {
  /* 
      This function deletes a [board] in the Postgree SQL database.
  */
  try {
    await db.board.delete({
      where: {
        id: id,
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
