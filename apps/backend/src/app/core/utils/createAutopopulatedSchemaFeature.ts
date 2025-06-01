import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";
const autopopulate = require('mongoose-autopopulate');

export function createAutopopulatedSchemaFeature(name: string, schema: Schema) {
  return MongooseModule.forFeatureAsync([
    {
      name,
      useFactory: () => {
        schema.plugin(autopopulate);
        return schema;
      }
    }
  ]);
}
