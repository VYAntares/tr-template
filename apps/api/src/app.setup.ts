import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

export const API_PREFIX = 'api';

/**
 * Called by main.ts and by the e2e suite so both exercise the same request
 * pipeline. Anything global belongs here, not in bootstrap().
 */
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);

  // Caddy terminates TLS and forwards plain http, so express only learns the
  // request was secure from X-Forwarded-Proto. Anything that inspects the
  // protocol (a secure cookie, a redirect to https) depends on this.
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // Zod, not class-validator: @ft/shared owns the rules and the browser applies
  // the same ones.
  app.useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('template-app API')
    .setDescription('HTTP surface of the template-app backend')
    .setVersion('1.0')
    .build();

  // SwaggerModule does not inherit the global prefix, so the path repeats it.
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, SwaggerModule.createDocument(app, config));
}
