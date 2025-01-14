import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaInstallComponent } from './reserva-install.component';

describe('ReservaInstallComponent', () => {
  let component: ReservaInstallComponent;
  let fixture: ComponentFixture<ReservaInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaInstallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
