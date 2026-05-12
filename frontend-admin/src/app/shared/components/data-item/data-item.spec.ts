import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItem } from './data-item';

describe('DataItem', () => {
  let component: DataItem;
  let fixture: ComponentFixture<DataItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DataItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
