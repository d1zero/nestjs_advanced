import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from "./app.module";

const start = async () => {
    const PORT = process.env.PORT || 8000
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Backend advanced')
        .setDescription('REST API docs')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })
}

start()