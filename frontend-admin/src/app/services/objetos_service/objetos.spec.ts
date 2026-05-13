import { TestBed } from '@angular/core/testing';

import { Objetos } from './objetos';

describe('Objetos', () => {
  let service: Objetos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Objetos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
