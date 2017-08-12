
import { Pastebin } from './page-objects/pastebin.po';
import { browser, protractor } from 'protractor';


/* Scenarios to be Tested 
  1. Pastebin Page should display a heading with text Pastebin Application 
  2. It should have a table header
  3. The table should have rows
  4. app-add-paste tag should exist
*/

describe('Pastebin Page', () => {
 
  const mainPage: Pastebin = new Pastebin();

  beforeEach(() => {
      mainPage.navigateToHome();
  });

  it('should display the heading Pastebin Application', () => {
    
      expect(mainPage.getPastebinHeading()).toEqual("Pastebin Application");

     
  });

   it('should have a table header', () => {
  
      expect(mainPage.getTableHeader()).toContain("id Title Language Code");
     
  })
  it('table should have at least one row', () => {
    
      expect(mainPage.getFirstRowData()).toContain("Hello world");
  })
  
  it('should have the app-add-paste tag', () => {
      expect(mainPage.isAddPasteTagPresent()).toBeTruthy();
  })
});
