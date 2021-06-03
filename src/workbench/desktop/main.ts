import 'reflect-metadata';
import App from './app';
import 'smelte/src/tailwind.css'
import '../ui/css/global.css';

const app = new App(document.body);
app.bootstrap();


export default app;
