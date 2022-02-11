import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNetworkComponent } from './entity-network.component';

describe('VisjsExampleComponent', () => {
  let component: EntityNetworkComponent;
  let fixture: ComponentFixture<EntityNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
