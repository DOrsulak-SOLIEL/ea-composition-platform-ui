import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNetworkComponent } from './test-network.component';

describe('VisjsExampleComponent', () => {
  let component: TestNetworkComponent;
  let fixture: ComponentFixture<TestNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
