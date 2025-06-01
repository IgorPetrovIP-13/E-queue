import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role, Roles } from "@repo/core/enums/roles";

export const UserCollection = "users";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  _id: string;

  @Prop({ type: String, default: null })
  avatar: string | null;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, default: Roles.USER })
  role: Role;

	@Prop({ type: Array<Types.ObjectId>, default: [] })
	organizations: Array<Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);
