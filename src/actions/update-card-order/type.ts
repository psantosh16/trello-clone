import { z } from "zod";
import { UpdateCardOrderSchema } from "./schema";
import { ActionState } from "@/hooks/useAction";
import { Card } from "../../../prisma/generated/client";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type OutputType = ActionState<InputType, Card[]>;
