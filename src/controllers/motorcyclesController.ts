import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/motorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(400).json({ error: this.errors.isIsNotValid });
    } catch (err) {
      console.log('cat');
      return res.status(404).json({ error: this.errors.notFound });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const motorcycle = await this.service.update(id, body);
      if (!motorcycle) {
        return res.status(400).json({ error: this.errors.isIsNotValid });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.delete(id);
      return motorcycle
        ? res.status(204).send(motorcycle)
        : res.status(400).json({ error: this.errors.isIsNotValid });
    } catch (err) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };
}

export default MotorcycleController;