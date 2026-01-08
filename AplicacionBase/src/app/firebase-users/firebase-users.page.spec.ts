import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseUsersPage } from './firebase-users.page';

describe('FirebaseUsersPage', () => {
  let component: FirebaseUsersPage;
  let fixture: ComponentFixture<FirebaseUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
