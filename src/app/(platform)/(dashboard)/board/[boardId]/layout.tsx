import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import { title } from "process";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }
  return (
    <div
      className="h-full relative bg-center object-cover bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardLayout;
