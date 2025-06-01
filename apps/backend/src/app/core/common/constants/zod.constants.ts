import { Types } from "mongoose";
import { z } from "zod";

export const zodObjectId = z.custom<Types.ObjectId>(
  value => {
    return Types.ObjectId.isValid(value);
  },
  {
    message: "Невалідний ID"
  }
);

export function zodStringNullable(minLength: number, maxLength: number) {
  return z.union([z.string().min(minLength).max(maxLength), z.null()]);
}

export const zodFileLinksArray = z.array(z.string().url()).max(10);

export const zodUrlNullable = z.union([z.null(), z.string().url()]);

export const zodUrlRequired = z.string().url();
