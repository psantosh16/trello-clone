import { z } from "zod";
import { DeleteBoardSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { Board } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof DeleteBoardSchema>;
export type OutputType = ActionState<InputType, Board>;
