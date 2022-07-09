import { expect } from 'chai';
import { Request, Response } from 'express';
import { RequestWithBody, ResponseError } from '../../../controllers';
import sinon, { SinonStub } from 'sinon';
import CarController from '../../../controllers/carController';
import { Car } from '../../../interfaces/CarInterface';
import CarService from '../../../services/carService';
import mocks from '../mocks/carMocks';

const carService = new CarService();
const carController = new CarController();

describe.only('Testa se teve sucessso na criação do Car', () => {
  const req = {} as RequestWithBody<Car>
  const res = {} as Response<Car | ResponseError>
  before(() => {
    // sinon.stub(carService, 'create').resolves(mocks.mockCar);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    req.body = mocks.mockCarBody
  })

  after(() => {
    // (carService.create as SinonStub).restore()
  })
  
  it('Testa se houve sucesso.', async () => {
    await carController.create(req, res);
    console.log((res.json as SinonStub));
    expect((res.status as SinonStub).calledWith(201)).to.be.true;
    // expect((res.json as SinonStub).calledWith(mocks.mockCar)).to.be.true;
  });

});