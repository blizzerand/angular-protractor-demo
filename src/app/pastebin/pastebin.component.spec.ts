
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { PastebinComponent } from './pastebin.component';
import { By }              from '@angular/platform-browser';
import { Pastebin, Languages } from '../pastebin';
import { PastebinService } from '../pastebin.service';

//Modules used for testing
import { HttpModule }    from '@angular/http';
import { AppTestingModule } from '../app-testing-module';

describe('PastebinComponent', () => {

//Typescript declarations.
  let comp: PastebinComponent;
  let fixture: ComponentFixture<PastebinComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockPaste: Pastebin[];
  let pastebinService: PastebinService;
  let spy: jasmine.Spy;

  // beforeEach is called once before every `it` block in a test.
  // Use this to configure to the component, inject services etc.
  
  beforeEach(async(() => { //async before is used for compiling external templates which is any async activity
  TestBed.configureTestingModule({
     imports: [AppTestingModule],
  })
  .compileComponents();  
    // compile template and css
}));

  beforeEach(()=> { 
    //And here is the synchronous async function
   
    fixture = TestBed.createComponent(PastebinComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.pastebin'));
    element  = de.nativeElement;

    //get the injected service from component's fixture.debugElement
    //if the service doesn't have a dependency, you can try Testbed.get()
    pastebinService = fixture.debugElement.injector.get(PastebinService);
    
    mockPaste = [
      { id:1, title: "Hello world", language: "Ruby", paste: "puts 'Hello'" }];
   
    spy = spyOn(pastebinService, 'getPastebin')
        .and.returnValue(Promise.resolve(mockPaste));
  });

    it('should have a Component',()=> {
    expect(comp).toBeTruthy();
  });

  it('should have a title', () => {
    comp.title = 'Pastebin Application';
    fixture.detectChanges();
    expect(element.textContent).toContain(comp.title);
  })
  
 it('should have a table to display the pastes', () => {
    expect(element.innerHTML).toContain("thead");
    expect(element.innerHTML).toContain("tbody");
  })

  it('should not show the pastebin before OnInit', () => {

    this.tbody = element.querySelector("tbody");
    //If you are curious about the replace() method, try the test without it
    expect(this.tbody.innerText.replace(/\s\s+/g, '')).toBe("", "tbody should be empty");
    expect(spy.calls.any()).toBe(false, "Spy shouldn't be yet called");
  });

  it('should still not show pastebin after component initialized', () => {
    fixture.detectChanges();
   // getPastebin service is async => still has not returned with the paste
    expect(this.tbody.innerText.replace(/\s\s+/g, '')).toBe("", 'tbody should still be empty');
    expect(spy.calls.any()).toBe(true, 'getPastebin should be called');
  });

  it('should show the list after getPastebin promise resolves', async() => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
        fixture.detectChanges();
        expect(comp.pastebin).toEqual(jasmine.objectContaining(mockPaste));
        expect(element.innerText.replace(/\s\s+/g, ' ')).toContain(mockPaste[0].title);
    });
  })


})