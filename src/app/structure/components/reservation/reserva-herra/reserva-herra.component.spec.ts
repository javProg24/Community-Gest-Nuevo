import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaHerraComponent } from './reserva-herra.component';

describe('ReservaHerraComponent', () => {
  let component: ReservaHerraComponent;
  let fixture: ComponentFixture<ReservaHerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaHerraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaHerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
