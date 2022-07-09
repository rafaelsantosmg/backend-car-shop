import CustomRouter from './routers/Router';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import CarController from './controllers/carController';
import MotorcycleController from './controllers/motorcyclesController';
import App from './app';

const server = new App();

const carController = new CarController();
const motorcyclesController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motorcycleRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcyclesController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
