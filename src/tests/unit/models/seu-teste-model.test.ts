import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import mocks from '../mocks/carMocks';

describe('Teste da camada Car Model', () => {
  
  describe('testa a função create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mocks.mockCar)
    })

    after(() => {
      (Model.create as SinonStub).restore()
    })
    
    it('Valida se Car foi criado com sucesso', async () => {
      const carModel = new CarModel();
      const carCreate = await carModel.create(mocks.mockCarBody);
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
      const carModel = new CarModel();
      const findCar = await carModel.read();
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
      const carModel = new CarModel();
      const findCar = await carModel.readOne(mocks.mockId);
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
      const carModel = new CarModel();
      const updateCar = await carModel.update(mocks.mockId, mocks.mockCar);
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
      const carModel = new CarModel();
      const deleteCar = await carModel.delete(mocks.mockId);
      expect(deleteCar).to.be.deep.equal(1);
    })
  })

})