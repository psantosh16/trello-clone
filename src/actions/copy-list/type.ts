import { z } from "zod";
import { CopyListSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { List } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof CopyListSchema>;
export type OutputType = ActionState<InputType, List>;
