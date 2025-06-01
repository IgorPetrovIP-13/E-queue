import { Module } from "@nestjs/common";
import { ConfigModule } from "./core/config/config.module";
import { MongooseModule } from "./core/mongoose/mogoose.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { OrganizationTypeModule } from "./organization_type/organization_type.module";
import { ConnectionTypeModule } from "./connection_type/connection_type.module";
import { OrganizationRequestModule } from "./organization_request/organization_request.module";
import { GatewayModule } from "./core/gateway/gateway.module";
import { UserOrganizationModule } from "./user_organizations/user_organizations.module";
import { OrganizationModule } from "./organization/organization.module";
import { OrganizationInviteModule } from "./organization_invite/organization_invite.module";
import { StaticQueueModule } from "./static_queue/static_queue.module";
import { AppointmentsModule } from './appointments/appointments.module';
import { DynamicQueuesModule } from './dynamic_queues/dynamic_queues.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule,
    AuthModule,
    ProfileModule,
    UserModule,
    OrganizationTypeModule,
    OrganizationModule,
    ConnectionTypeModule,
    OrganizationRequestModule,
    GatewayModule,
    UserOrganizationModule,
    OrganizationInviteModule,
		StaticQueueModule,
		AppointmentsModule,
		DynamicQueuesModule,
  ]
})
export class AppModule {}
