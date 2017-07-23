/*pastebin.service.ts */
import { Injectable } from '@angular/core';
import { Pastebin } from './pastebin';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PastebinService {

// The project uses InMemoryWebApi to handle the Server API. 
// Here "api/pastebin" simulates a Server API url 
  private pastebinUrl = "api/pastebin";
  private headers  = new Headers({'Content-Type': "application/json"});
  constructor(private http: Http) { }

	// getPastebin() performs http.get() and returns a promise
	public getPastebin():Promise<any> {
		return this.http.get(this.pastebinUrl)
		   .toPromise()
	   	   .then(response => response.json().data)
		   .catch(this.handleError);
	}

    //addPaste() creates new pastes 
	public addPaste(pastebin: Pastebin): Promise<any> {
		return this.http.post(this.pastebinUrl, JSON.stringify(pastebin), {headers: this.headers})
	   .toPromise()
		   .then(response =>response.json().data)
		   .catch(this.handleError);
	}
	//updatePaste() creates new pastes 
	public updatePaste(paste: Pastebin):Promise<any> {
		
		const url = `${this.pastebinUrl}/${paste.id}`;
		return this.http.put(url, JSON.stringify(paste), {headers: this.headers})
			.toPromise()
			.then(() => paste)
			.catch(this.handleError);
	}
	//deletePaste() creates new pastes 
	public deletePaste(pastebin: Pastebin): Promise<void> {
		const url = `${this.pastebinUrl}/${pastebin.id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null )
			.catch(this.handleError);
	}


  private handleError(error: any): Promise<any> {
 	 console.error('An error occurred', error); 
  	 return Promise.reject(error.message || error);
  }
}