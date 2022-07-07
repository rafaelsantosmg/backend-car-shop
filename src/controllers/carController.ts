import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/carService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<Response<Car | ResponseError>> => {
    const { body } = req;
    try {
      const cars = await this.service.create(body);
      if (!cars) {
        return res.status(400).json({ error: this.errors.internal });
      }
      if ('error' in cars) {
        return res.status(400).json(cars);
      }
      return res.status(201).json(cars);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const cars = await this.service.readOne(id);
      console.log(cars);
      return cars
        ? res.json(cars)
        : res.status(400).json({ error: this.errors.isIsNotValid });
    } catch (err) {
      console.log('cat');
      return res.status(404).json({ error: this.errors.notFound });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const cars = await this.service.update(id, body);
      return cars
        ? res.json(cars)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const cars = await this.service.delete(id);
      return cars
        ? res.json(cars)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;