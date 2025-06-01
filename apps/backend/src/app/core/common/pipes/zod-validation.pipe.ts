import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodTypeAny, ZodError } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation failed",
          errors: error.issues
        });
      }
      throw error;
    }
  }
}
