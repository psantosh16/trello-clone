import { z } from "zod";
import { UpdateListOrderSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { List } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type OutputType = ActionState<InputType, List[]>;
