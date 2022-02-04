import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisjsExampleComponent } from './visjs-example.component';

describe('VisjsExampleComponent', () => {
  let component: VisjsExampleComponent;
  let fixture: ComponentFixture<VisjsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisjsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisjsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
