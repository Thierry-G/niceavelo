import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerciPage } from './merci.page';

describe('MerciPage', () => {
  let component: MerciPage;
  let fixture: ComponentFixture<MerciPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MerciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
