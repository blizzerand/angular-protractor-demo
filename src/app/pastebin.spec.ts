import { Pastebin } from './pastebin';

describe('Pastebin', () => {
	it('should create an instance of Pastebin',() => {

		expect(new Pastebin()).toBeTruthy();

	});

	it('should accept values', () => {
		let pastebin = new Pastebin();
		pastebin = {
			id: 1,
			title: "Test",
			language: 1,
			paste: "Something here",
		}

		expect(pastebin.id).toEqual(1);
		expect(pastebin.title).toEqual("Test");
		expect(pastebin.language).toEqual(1);
		expect(pastebin.paste).toBeDefined();
	});


})