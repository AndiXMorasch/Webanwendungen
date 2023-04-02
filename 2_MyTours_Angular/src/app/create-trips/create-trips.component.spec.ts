import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripsComponent } from './create-trips.component';

describe('CreateTripsComponent', () => {
  let component: CreateTripsComponent;
  let fixture: ComponentFixture<CreateTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
