import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Gateway } from './gateway';

@Module({
	imports: [EventEmitterModule.forRoot()],
	providers: [Gateway],
	exports: [EventEmitterModule, Gateway],
})

export class GatewayModule {}