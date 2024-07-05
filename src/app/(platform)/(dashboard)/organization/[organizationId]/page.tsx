import { db } from "@/lib/db";
import { BoardTitle } from "./_components/board-title";
import BoardCreationForm from "./_components/create-board-form";

const OrganizationIdPage = async () => {
  const board: { id: string; title: string }[] = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-2">
      <BoardCreationForm />
      <div className="space-y-2">
        {board.map((b) => (
          <BoardTitle key={b.id} id={b.id} title={b.title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
