//pastebin.po.ts

import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { Base } from './base.po';

export class Pastebin extends Base {

	
	getPastebin():ElementFinder {
		return element(by.css('.pastebin'));
	}

	/* Pastebin Heading */
	getPastebinHeading(): promise.Promise<string> {
		return this.getPastebin().element(by.css("h2")).getText();
	}

	/*Table Data */

	getTable():ElementFinder {
		return this.getTable().element(by.css('table'));

	}

	getTableHeader(): promise.Promise<string> {
		return this.getPastebin().all(by.tagName('tr')).get(0).getText();
	}

	getTableRow(): ElementArrayFinder {
		return this.getPastebin().all(by.tagName('tr'));
	}

	
	getFirstRowData(): promise.Promise<string> {
		return this.getTableRow().get(1).getText();
	}

	getLastRowData(): promise.Promise<string> {
		return this.getTableRow().last().getText();
	}

	/*app-add-paste tag*/

	getAddPasteTag(): ElementFinder {
		return this.getPastebin().element(by.tagName('app-add-paste'));
	}

	isAddPasteTagPresent(): promise.Promise<boolean> {
		return this.getAddPasteTag().isPresent();
	}


}