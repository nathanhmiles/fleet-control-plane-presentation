import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function bootstrap() {
  // Should check isDevMode, removed for demo purposes
  const { worker } = await import('./app/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });

  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}

bootstrap();
