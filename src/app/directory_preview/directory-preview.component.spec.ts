import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryPreviewComponent } from './directory-preview.component';

describe('DirectoryTreeComponent', () => {
  let component: DirectoryPreviewComponent;
  let fixture: ComponentFixture<DirectoryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
