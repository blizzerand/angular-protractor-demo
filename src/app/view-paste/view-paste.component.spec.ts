import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ViewPasteComponent } from './view-paste.component';
import { AppTestingModule } from '../app-testing-module';
import { DebugElement, Component } from '@angular/core';
import { PastebinService } from '../pastebin.service';
import {Pastebin, Languages } from '../pastebin';
import { By } from '@angular/platform-browser';


describe('ViewpasteComponent', () => {
  let component: ViewPasteComponent;
  let fixture: ComponentFixture<ViewPasteComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppTestingModule], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.view-paste'));
    element = de.nativeElement;
   
    
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show a button with text View Paste', ()=> {
    expect(element.textContent).toContain("View Paste");
  });

  it('should not display the modal until the button is clicked', () => {
      expect(element.textContent).not.toContain("source-modal");
  });

  describe("ViewPasteModal", () => {
    let spyOnDelete: jasmine.Spy;
    let spyOnUpdate: jasmine.Spy;
    let pastebinService: PastebinService;
    let mockPaste: Pastebin;
    let response:any; 
    let inputTitle: HTMLInputElement;
    let selectLanguage: HTMLSelectElement;
    let textAreaPaste: HTMLTextAreaElement;

      beforeEach(()=> {
        //Set showPasteModal to true to ensure that the modal is visible in further tests
        component.showPasteModal = true;
        mockPaste = {id:1, title:"New paste", language:Languages[2], paste: "console.log()"};
        //Inject PastebinService
        pastebinService = fixture.debugElement.injector.get(PastebinService);
        //Create spies for deletePaste and updatePaste methods
        spyOnDelete = spyOn(pastebinService,'deletePaste').and.returnValue(Promise.resolve(true));
        spyOnUpdate = spyOn(pastebinService, 'updatePaste').and.returnValue(Promise.resolve(mockPaste));
        //component.paste is an input property 
        component.paste = mockPaste;
        fixture.detectChanges();
       
      })
    it('should display the modal when the view Paste button is clicked',() => {
  
      fixture.detectChanges();
      expect(component.showPasteModal).toBeTruthy("SHow should be true");
      expect(element.innerHTML).toContain("source-modal");
    });

    it('should have all the butons',() => {
      expect(element.innerHTML).toContain('Edit Paste');
      expect(element.innerHTML).toContain('Delete');
      expect(element.innerHTML).toContain('Close');
    });

    it('and clicking it should make the paste editable', () => {

      component.onEdit();
      fixture.detectChanges();
      expect(component.editEnabled).toBeTruthy();
      expect(element.innerHTML).toContain('Save');
        
    });

    it('should take input values', fakeAsync(() => {
      component.editEnabled= true;
      component.updatePasteSuccess.subscribe((res:any) => {response = res},)
      fixture.detectChanges();

      inputTitle= element.querySelector("input");
      inputTitle.value = mockPaste.title;
      inputTitle.dispatchEvent(new Event("input"));
      
      expect(mockPaste.title).toEqual(component.paste.title);
    
      component.onSave();

      //first round of detectChanges()
      fixture.detectChanges();

      //the tick() operation. Don't forget to import tick
      tick();

      //Second round of detectChanges()
      fixture.detectChanges();
     
      expect(spyOnUpdate.calls.any()).toBe(true, 'updatePaste() method should be called');
      
    }))

    it('should delete the paste', fakeAsync(()=> {
      
      component.deletePasteSuccess.subscribe((res:any) => {response = res},)
      component.onDelete();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(response.title).toEqual(mockPaste.title);
      expect(spyOnDelete.calls.any()).toBe(true, "Pastebin deletePaste() method should be called");
      expect(response).toBeTruthy();
}))
    

  });
})
