import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../services/carService';
import mocks from '../mocks/carMocks';

describe('Teste da camada Car Service', () => {
  describe('testa a função create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })

    it('Valida se Car foi criado com sucesso', async () => {
      const carService = new CarService();
      const carCreate = await carService.create(mocks.mockCarBody);
      expect(carCreate).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função find Car', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([mocks.mockCar])
    })

    after(() => {
      (Model.find as SinonStub).restore()
    })

    it('Valida se busca Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const findCar = await carService.read();
      expect(findCar).to.be.deep.equal([mocks.mockCar]);
    })
  })

  describe('testa a função findOne Car', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.findOne as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const findCar = await carService.readOne(mocks.mockId);
      expect(findCar).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função update Car', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const updateCar = await carService.update(mocks.mockId, mocks.mockCar);
      expect(updateCar).to.be.deep.equal(mocks.mockCar);
    })
  })

  describe('testa a função delete Car', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(1)
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore()
    })

    it('Valida se busca por 1 Car foi feita com sucesso', async () => {
      const carService = new CarService();
      const deleteCar = await carService.delete(mocks.mockId);
      expect(deleteCar).to.be.deep.equal(1);
    })
  })
})