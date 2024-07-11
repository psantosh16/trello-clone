import { z } from "zod";
import { UpdateBoardSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { Board } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof UpdateBoardSchema>;
export type OutputType = ActionState<InputType, Board>;
