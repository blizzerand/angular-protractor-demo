
import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { Base } from './base.po';
export class AddPaste extends Base  {
	
	getAddPaste():ElementFinder {
		return element(by.tagName('app-add-paste'));
	}
	
	/* Create Paste button */
	getCreateButton(): ElementFinder {
		return this.getAddPaste().element(by.buttonText("create Paste"));
	}

	isCreateButtonPresent() : promise.Promise<boolean> {
		return this.getCreateButton().isPresent();
	}

	clickCreateButton(): promise.Promise<void> {
		return this.getCreateButton().click();
	}

	/*Create Paste Modal */

	getCreatePasteModal(): ElementFinder {
		return this.getAddPaste().element(by.id("source-modal"));
	}

	isCreatePasteModalPresent() : promise.Promise<boolean> {
		return this.getCreatePasteModal().isPresent();
	}

	/*Save button */
	getSaveButton(): ElementFinder {
		return this.getAddPaste().element(by.buttonText("Save"));
	}
	
	clickSaveButton():promise.Promise<void> {
		return this.getSaveButton().click();
	}

	/*Close button */

	getCloseButton(): ElementFinder {
		return this.getAddPaste().element(by.buttonText("Close"));
	}

	clickCloseButton():promise.Promise<void> {
		return this.getCloseButton().click();
	}
	

	/* Get Input Paste values from the Modal window */
	getInputPasteValues():any {
		let inputTitle, inputLanguage, inputPaste;

		return Promise.all([this.getInputTitle().getAttribute('value'), this.getInputLanguage().getAttribute('value'), this.getInputPaste().getAttribute('value')])
		.then( (values) => {
			return values;
		});
		
	}

	/* Add a new Paste */

	addNewPaste():any {
		let newPaste: any = this.getMockPaste();

		this.getInputTitle().sendKeys(newPaste.title);
		this.getInputLanguage()
			.element(by.cssContainingText('option', newPaste.language)).click();
		this.getInputPaste().sendKeys(newPaste.paste);

  		return Object.keys(newPaste).map(key => newPaste[key]);

	}



}