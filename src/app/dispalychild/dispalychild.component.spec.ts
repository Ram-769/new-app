import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalychildComponent } from './dispalychild.component';

describe('DispalychildComponent', () => {
  let component: DispalychildComponent;
  let fixture: ComponentFixture<DispalychildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispalychildComponent]
    });
    fixture = TestBed.createComponent(DispalychildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
