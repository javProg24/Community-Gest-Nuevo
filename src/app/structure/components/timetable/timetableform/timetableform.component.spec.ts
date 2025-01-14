import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableformComponent } from './timetableform.component';

describe('TimetableformComponent', () => {
  let component: TimetableformComponent;
  let fixture: ComponentFixture<TimetableformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
