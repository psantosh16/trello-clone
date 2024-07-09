import { z } from "zod";
import { CreateBoardSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { Board } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type OutputType = ActionState<InputType, Board>;
