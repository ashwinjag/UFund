import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRemoveComponent } from './admin-add-remove.component';

describe('AdminAddRemoveComponent', () => {
  let component: AdminAddRemoveComponent;
  let fixture: ComponentFixture<AdminAddRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddRemoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
