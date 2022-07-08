import { Car } from '../../../interfaces/CarInterface';
import { Model } from '../../../interfaces/ModelInterface';
import mocks from './carMocks';

export default class CarModelMock implements Model<Car> {
  async create(body: Car): Promise<Car> {
    return mocks.mockCar;
  }
  async read(): Promise<Car[]> {
    return [mocks.mockCar]
  }
  async readOne(id: string): Promise<Car | null> {
    return mocks.mockCar
  }
  async update(id: string, body: Car): Promise<Car | null> {
    return mocks.mockCar
  }
  async delete(id: string): Promise<Car | null> {
    return mocks.mockCar
  }
}
