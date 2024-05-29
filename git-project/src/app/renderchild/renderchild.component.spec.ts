import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderchildComponent } from './renderchild.component';

describe('RenderchildComponent', () => {
  let component: RenderchildComponent;
  let fixture: ComponentFixture<RenderchildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenderchildComponent]
    });
    fixture = TestBed.createComponent(RenderchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
