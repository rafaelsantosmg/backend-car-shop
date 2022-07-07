import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/carModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (body: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(body);
  };

  readOne = async (id: string): Promise<Car | null> => {
    if (id.length < 24) return null;
    const car = await this.model.readOne(id);
    if (!car) throw new Error('Object not found');
    return car;
  };
}

export default CarService;
