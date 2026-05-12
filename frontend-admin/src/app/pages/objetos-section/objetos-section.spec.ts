import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosSection } from './objetos-section';

describe('ObjetosSection', () => {
  let component: ObjetosSection;
  let fixture: ComponentFixture<ObjetosSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetosSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjetosSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
