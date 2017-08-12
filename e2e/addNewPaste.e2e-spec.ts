
import { Pastebin } from './page-objects/pastebin.po';
import { AddPaste } from './page-objects/add-paste.po';
import { browser, protractor } from 'protractor';

/* Scenarios to be Tested 
  1. AddPaste Page should have a button when clicked on should present a modal window 
  2. The modal window should accept the new vales and save them
  3. The saved data should appear in the MainPage
  4. Close button should work
*/

describe('Add-New-Paste page', () => {
 
  const addPastePage: AddPaste = new AddPaste();
  const mainPage: Pastebin = new Pastebin();

  beforeEach(() => {
 
    addPastePage.navigateToHome();
  });

  it('should have an Create Paste button and modal window', () => {

    expect(addPastePage.isCreateButtonPresent()).toBeTruthy("The button should exist");
    expect(addPastePage.isCreatePasteModalPresent()).toBeFalsy("The modal window shouldn't appear, not yet!");
    
    addPastePage.clickCreateButton();
    
    expect(addPastePage.isCreatePasteModalPresent()).toBeTruthy("The modal window should appear now");
   

  });

  it('should accept and save input values', () => {
   
    addPastePage.clickCreateButton();
     
    const emptyInputValues = ["","",""];
    expect(addPastePage.getInputPasteValues()).toEqual(emptyInputValues);
    
    const newInputValues = addPastePage.addNewPaste();
    expect(addPastePage.getInputPasteValues()).toEqual(newInputValues);

    addPastePage.clickSaveButton();
 
    expect(addPastePage.isCreatePasteModalPresent()).toBeFalsy("The modal window should be gone");
    expect(mainPage.getLastRowData()).toContain("Something here");

  });

  it('close button should work', () => {
    
    addPastePage.clickCreateButton();
    addPastePage.clickCloseButton();
    
    expect(addPastePage.isCreatePasteModalPresent()).toBeFalsy("The modal window should be gone");
     
  });
  
});
