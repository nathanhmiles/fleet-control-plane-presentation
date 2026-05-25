import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function bootstrap() {
  // Should check isDevMode, removed for demo purposes
  const { worker } = await import('./app/mocks/browser');

  const baseHref = document.querySelector('base')?.getAttribute('href') ?? '/';

  return worker.start({
    serviceWorker: {
      url: `${baseHref}mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
  });

  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}

bootstrap();
