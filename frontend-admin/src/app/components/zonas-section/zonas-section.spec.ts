import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasSection } from './zonas-section';

describe('ZonasSection', () => {
  let component: ZonasSection;
  let fixture: ComponentFixture<ZonasSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonasSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ZonasSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
