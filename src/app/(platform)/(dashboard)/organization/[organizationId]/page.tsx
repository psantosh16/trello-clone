import { db } from "@/lib/db";
import { BoardTitle } from "./_components/board-title";
import BoardCreationForm from "./_components/create-board-form";

const OrganizationIdPage = async () => {
  const board = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-2">
      <BoardCreationForm />
      <div className="space-y-2">
        {board.map((board) => (
          <BoardTitle key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
