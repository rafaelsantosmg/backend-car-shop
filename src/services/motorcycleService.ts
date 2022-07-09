import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/motorcycleModel';

const errorMessage = 'Object not found';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (body: Motorcycle):
  Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(body);
  };

  readOne = async (id: string): Promise<Motorcycle | null> => {
    if (id.length < 24) return null;
    const motorcycle = await this.model.readOne(id);
    if (!motorcycle) throw new Error(errorMessage);
    return motorcycle;
  };

  update = async (id: string, body: Motorcycle):
  Promise<Motorcycle | ServiceError | null> => {
    if (id.length < 24) return null;
    const parsed = MotorcycleSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const motorcycle = await this.model.update(id, body);
    if (!motorcycle) throw new Error(errorMessage);
    return motorcycle;
  };

  delete = async (id: string): Promise<Motorcycle | null> => {
    if (id.length < 24) return null;
    const motorcycle = await this.model.delete(id);
    if (!motorcycle) throw new Error(errorMessage);
    return motorcycle;
  };
}

export default MotorcycleService;
