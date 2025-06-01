import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AllExceptionsFilter } from "./app/core/common/filters/all-exceptions.filter";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_HOST, process.env.CLIENT_ADMIN_HOST],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new AllExceptionsFilter());

	const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
}

bootstrap();
