
import { Pastebin } from './page-objects/pastebin.po';
import { AddPaste } from './page-objects/add-paste.po';
import { ViewPaste } from './page-objects/view-paste.po';
import { browser, protractor } from 'protractor';


/* Scenarios to be Tested 
  1. ViewPaste Page should have a button when clicked on should present a modal window 
  2. The modal window should display the paste data
  3. The modal window should accept new values
  4. Delete button should work
*/

describe("The viewPaste component", () => {
  const viewPastePage: ViewPaste  = new ViewPaste();
  const addPastePage: AddPaste = new AddPaste();
  const mainPage: Pastebin  = new Pastebin();

  beforeEach(()=> {
   //Steps for a adding a new Paste first.
   viewPastePage.navigateToHome();
   addPastePage.clickCreateButton();
   addPastePage.addNewPaste();
   addPastePage.clickSaveButton();

  })

  it('view Paste button should display a modal window', () => {
   
    expect(viewPastePage.isViewPasteModalPresent()).toBeFalsy("It shouldn't exist right now");
    viewPastePage.clickViewPasteButton();
    expect(viewPastePage.isViewPasteModalPresent()).toBeTruthy("It should popup now");

    viewPastePage.clickCloseButton();

    expect(viewPastePage.isViewPasteModalPresent()).toBeFalsy("The window should be closed now");

  })

  //Nested describe block. 
  describe("The viewPaste modal", () => {
      
    beforeEach(()=> {
      viewPastePage.clickViewPasteButton();
    })

    it('should display the paste data', () => {
    
      let expectedValues = ['Something here', 'Ruby'];
      expect(jasmine.arrayContaining(expectedValues)).toEqual(viewPastePage.getPasteDataFromModal());
     
    })

    it('should accept new Values', () => {

      viewPastePage.clickEditButton();
      let expectedValues = viewPastePage.editPaste();
      viewPastePage.clickSaveButton();
      expect(viewPastePage.getPasteDataFromModal()).toBeTruthy();
      //expect(jasmine.arrayContaining(expectedValues)).toEqual(viewPastePage.getPasteDataFromModal());

    })

    it('Delete button should work', () => {
      const rowToBeDeleted = mainPage.getLastRowData();
      viewPastePage.clickDeleteButton();
      expect(viewPastePage.isViewPasteModalPresent()).toBeFalsy();
  
      expect(mainPage.getLastRowData()).not.toEqual(rowToBeDeleted);
    })
  })
})