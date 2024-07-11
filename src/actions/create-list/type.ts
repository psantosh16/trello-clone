import { z } from "zod";
import { CreateListSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { List } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof CreateListSchema>;
export type OutputType = ActionState<InputType, List>;
