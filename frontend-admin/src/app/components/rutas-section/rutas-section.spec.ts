import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasSection } from './rutas-section';

describe('RutasSection', () => {
  let component: RutasSection;
  let fixture: ComponentFixture<RutasSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasSection],
    }).compileComponents();

    fixture = TestBed.createComponent(RutasSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
