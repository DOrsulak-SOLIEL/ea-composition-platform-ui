import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaTableComponent } from './ea-table.component';

describe('EaTableComponent', () => {
  let component: EaTableComponent;
  let fixture: ComponentFixture<EaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
