import { z } from "zod";
import { CreateCardSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { Card } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof CreateCardSchema>;
export type OutputType = ActionState<InputType, Card>;
