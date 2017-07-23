export class Pastebin {

    id: number;
    title: string;
	language: string;
	paste: string;

	constructor(values: Object = {}) {
        Object.assign(this, values);
  }

}
/*Export the Languages array so that we don't have to maintain
separate language list in our components                     */
 export const Languages = ["Ruby","Java", "JavaScript", "C", "Cpp"];