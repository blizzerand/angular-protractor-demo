const enum Languages {
    "Ruby", "JavaScript", "C", "C++", "Java"
}


export class Pastebin {
	id: number;
	title: string;
	language: Languages;
	paste: string;
}
