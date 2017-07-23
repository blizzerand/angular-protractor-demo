import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pastebin } from './pastebin';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //create an array of mockPastes.
    const pastebin:Pastebin[] = [
      { id: 0,  title: "Hello world Ruby", language: "Ruby", paste: 'puts "Hello World"' },
      { id: 1, title: "Hello world C", language: "C", paste: 'printf("Hello world");'},
      { id: 2, title: "Hello world CPP", language: "C++", paste: 'cout<<"Hello world";'},
      { id: 3, title: "Hello world Javascript", language: "JavaScript", paste: 'console.log("Hello world")'}
      
    ];
    return {pastebin};
  }
}