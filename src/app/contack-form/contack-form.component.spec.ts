import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContackFormComponent } from './contack-form.component';

describe('ContackFormComponent', () => {
  let component: ContackFormComponent;
  let fixture: ComponentFixture<ContackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContackFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
