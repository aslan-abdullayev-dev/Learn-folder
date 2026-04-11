import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumOperatorComponent } from './num-operator.component';

describe('NumOperatorComponent', () => {
  let component: NumOperatorComponent;
  let fixture: ComponentFixture<NumOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
