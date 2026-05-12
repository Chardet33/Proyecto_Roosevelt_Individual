import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSection } from './usuarios-section';

describe('UsuariosSection', () => {
  let component: UsuariosSection;
  let fixture: ComponentFixture<UsuariosSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosSection],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
