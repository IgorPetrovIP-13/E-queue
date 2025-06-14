import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { ICreateAppointmentReq } from "@repo/api/services/appointment/appointment.types";
import { IUserRequest } from "@repo/core/types/user-request.types";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";

@UseGuards(AccessTokenGuard)
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(
    @Body() body: ICreateAppointmentReq,
    @Req() req: IUserRequest
  ) {
    return this.appointmentsService.createAppointment(body, req.user.sub);
  }

  @Get("as-user")
  async getAppointmentsAsUser(@Req() req: IUserRequest) {
    return this.appointmentsService.getAppointmentsAsUser(req.user.sub);
  }

  @Get("my-today-appointments")
  async getMyTodayAppointments(@Req() req: IUserRequest) {
    return this.appointmentsService.getMyTodayAppointments(req.user.sub);
  }
}
