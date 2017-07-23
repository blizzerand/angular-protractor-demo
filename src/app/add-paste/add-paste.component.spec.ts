import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PastebinService } from '../pastebin.service';
import {Pastebin, Languages } from '../pastebin';
import { By } from '@angular/platform-browser';
import { AddPasteComponent } from './add-paste.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppTestingModule } from '../app-testing-module';

describe('AddPasteComponent', () => {
 
  let component: AddPasteComponent;
  let fixture: ComponentFixture<AddPasteComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let spy: jasmine.Spy;
  let pastebinService: PastebinService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //initialization  
    fixture = TestBed.createComponent(AddPasteComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.add-paste'));
    element = de.nativeElement;
    //spy = spyOn(pastebinService, 'addPaste').and.callThrough();
    //ask fixture to detect changes
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the `create Paste` button', () => {
     //There should a create button in the template
      expect(element.innerText).toContain("create Paste");
  });

 it('should not display the modal unless the button is clicked', () => {
   
   //source-model is an id for the modal. It shouldn't show up unless create button is clicked
    expect(element.innerHTML).not.toContain("source-modal");
   
   //Component's showModal property should be false at the moment
    expect(component.showModal).toBeFalsy("Show modal should be initially false");
 })

 it('should display the modal when `create Paste` is clicked', () => {
   
    let createPasteButton = fixture.debugElement.query(By.css("button"));
    //create a spy on the createPaste  method
    spyOn(component,"createPaste").and.callThrough();
    
    //triggerEventHandler simulates a click event on the button object
    createPasteButton.triggerEventHandler('click',null);
    
    //spy checks whether the method was called
    expect(component.createPaste).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.showModal).toBeTruthy("showModal should now be true");
    expect(element.innerHTML).toContain("source-modal");
 })

   describe("AddPaste Modal", () => {
  
    let inputTitle: HTMLInputElement;
    let selectLanguage: HTMLSelectElement;
    let textAreaPaste: HTMLTextAreaElement;
    let mockPaste: Pastebin, responsePaste: Pastebin;
    let spyOnAdd: jasmine.Spy;
    let pastebinService: PastebinService;

    beforeEach(() => {
      
      component.showModal = true;
      fixture.detectChanges();

      mockPaste = { id:1, title: "Hello world", language: Languages[2], paste: "console.log('Hello world');"};
       //Access the injected Pastebin service
      pastebinService = fixture.debugElement.injector.get(PastebinService);
       //Create a jasmine spy to spy on the addPaste method
      spyOnAdd = spyOn(pastebinService,"addPaste").and.returnValue(Promise.resolve(mockPaste));
      //Subsbcribe to the event emitter first
      component.addPasteSuccess.subscribe((response: Pastebin) => {responsePaste = response},)
      
    });

     it("should accept input values", () => {
      //Query the input selectors
      inputTitle = element.querySelector("input");
      selectLanguage = element.querySelector("select");
      textAreaPaste = element.querySelector("textarea");

      //Set the input element's value to mockPaste
      inputTitle.value = mockPaste.title;
      selectLanguage.value = mockPaste.language;
      textAreaPaste.value = mockPaste.paste;



      //Dispatch an event to tell the component input value has changed
      inputTitle.dispatchEvent(new Event("input"));
      selectLanguage.dispatchEvent(new Event("change"));
      textAreaPaste.dispatchEvent(new Event("input"));
      

      expect(mockPaste.title).toEqual(component.newPaste.title);
      expect(mockPaste.language).toEqual(component.newPaste.language);
      expect(mockPaste.paste).toEqual(component.newPaste.paste);

    });
 
    it("should submit the values", async() => {   
      component.newPaste = mockPaste;
      component.onSave();
       fixture.detectChanges();
       fixture.whenStable().then( () => {
          fixture.detectChanges();
          expect(spyOnAdd.calls.any()).toBeTruthy();
          expect(responsePaste.title).toEqual(mockPaste.title);
       });

    });
 
    it("should have a onClose method", () => {
      component.onClose();
      fixture.detectChanges();
      expect(component.showModal).toBeFalsy();
     })

  })
})