import CustomRouter from './routers/Router';
import { Car } from './interfaces/CarInterface';
import App from './app';

import CarController from './controllers/carController';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
