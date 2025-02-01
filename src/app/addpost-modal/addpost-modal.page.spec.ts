import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostModalPage } from './addpost-modal.page';
describe('AddPostModalPage', () => {
  let component: AddPostModalPage;
  let fixture: ComponentFixture<AddPostModalPage>;
  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
