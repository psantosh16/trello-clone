import { z } from "zod";
import { DeleteListSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { List } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof DeleteListSchema>;
export type OutputType = ActionState<InputType, List>;
