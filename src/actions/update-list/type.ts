import { z } from "zod";
import { UpdateListSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { List } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof UpdateListSchema>;
export type OutputType = ActionState<InputType, List>;
