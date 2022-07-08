import { expect } from 'chai';
import CarService from '../../../services/carService'
import CarModelMock from '../mocks/carModelMock';
import mocks from '../mocks/carMocks';

describe('Teste da camada Car Service', () => {
  describe('testa a função create Car', () => {
    it('Valida se Car foi criado com sucesso', async () => {
      const carModel = new CarModelMock();
      const carCreate = await carModel.create(mocks.mockCarBody);
      expect(carCreate).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função find Car', () => {
    it('Valida se busca Car foi feita com sucesso', async () => {
      const carModel = new CarModelMock();
      const findCar = await carModel.read();
      expect(findCar).to.be.deep.equal([mocks.mockCar]);
    })
  })

  describe('testa a função findOne Car', () => {
    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carModel = new CarModelMock();
      const findCar = await carModel.readOne(mocks.mockId);
      expect(findCar).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função update Car', () => {
    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carModel = new CarModelMock();
      const updateCar = await carModel.update(mocks.mockId, mocks.mockCar);
      expect(updateCar).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função delete Car', () => {
    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carModel = new CarModelMock();
      const deleteCar = await carModel.delete(mocks.mockId);
      expect(deleteCar).to.be.deep.equal(mocks.mockCar);
    })
  })
})