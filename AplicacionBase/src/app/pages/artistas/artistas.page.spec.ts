import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistasPage } from './artistas.page';

describe('ArtistasPage', () => {
  let component: ArtistasPage;
  let fixture: ComponentFixture<ArtistasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
