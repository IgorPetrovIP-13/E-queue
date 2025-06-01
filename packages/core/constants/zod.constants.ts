import { Types } from "mongoose";
import { z } from "zod";

export const zodObjectId = z
  .string()
  .min(10)
  .refine(val => {
    return Types.ObjectId.isValid(val);
  });

export const zodStringNullable = (minLength: number, maxLength: number) => {
  return z.union([z.string().min(minLength).max(maxLength), z.null()]);
};

export const zodFileLinksArray = z.array(z.string().url()).max(10);

export const zodUrlOptional = z.union([
  z.string().url(),
  z.literal(""),
  z.null()
]);

export const zodUrlRequired = z.string().url();

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
	"image/gif",
	"image/svg+xml",
	"image/bmp",
	"image/tiff",
	"image/heif",
	"image/heic"
];

export const zodImage = z
  .any()
  .refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );
