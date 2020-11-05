import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustumerFormComponent } from './custumer-form.component';

describe('CustumerFormComponent', () => {
  let component: CustumerFormComponent;
  let fixture: ComponentFixture<CustumerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustumerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
