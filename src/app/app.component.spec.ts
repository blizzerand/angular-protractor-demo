import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AppComponent } from './app.component';

describe('The title should exist', () => {

  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance; // AppComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should have a defined component', () => {
        expect(comp).toBeDefined();
    });

  it('should display new title', () => {
  	fixture.detectChanges();
  	comp.title = "Something else";
   fixture.detectChanges();
  	expect(el.textContent).toContain(comp.title);
  });
})