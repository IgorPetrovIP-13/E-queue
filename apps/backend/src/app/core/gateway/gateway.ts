import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { OnEvent } from '@nestjs/event-emitter';
import { IGeneralNotification, SocketEvents } from "@repo/core/constants/socket-events";
import { IComment } from "../../organization_request/organization_request.types";
import { Types } from "mongoose";

@WebSocketGateway({
  namespace: "/",
  cors: { origin: true, credentials: true }
})
export class Gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    Logger.log("WebSocket server initialized");
  }

  handleConnection(client: Socket) {
    Logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("subscribe")
  handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() { room }: { room: string }
  ) {
    client.join(room);
  }

  @SubscribeMessage("unsubscribe")
  handleUnsubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() { room }: { room: string }
  ) {
    client.leave(room);
  }

  @OnEvent(SocketEvents.ORGANIZATION_REQUEST_CHAT_COMMENT)
  handleMessageNew(payload: { room: string; message: IComment }) {
    this.server.to(payload.room).emit(SocketEvents.ORGANIZATION_REQUEST_CHAT_COMMENT, payload.message);
  }

	@OnEvent(SocketEvents.GENERAL_NOTIFICATION)
	handleGeneralNotification(payload: { userId: Types.ObjectId; message: IGeneralNotification }) {
		this.server.to(`general_notification/${payload.userId.toString()}`).emit(SocketEvents.GENERAL_NOTIFICATION, payload.message);
	}
}
