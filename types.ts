import { Card, List } from "./prisma/generated/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List[] };
