import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerComponent } from './reproducer.component';

describe('ReproducerComponent', () => {
  let component: ReproducerComponent;
  let fixture: ComponentFixture<ReproducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReproducerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
