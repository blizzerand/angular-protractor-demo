/*pastebin.component.ts*/

import { Component, OnInit } from '@angular/core';
import { Pastebin } from '../pastebin';
import { PastebinService } from '../pastebin.service';

@Component({
  selector: 'app-pastebin',
  templateUrl: './pastebin.component.html',
  styleUrls: ['./pastebin.component.css']
})
export class PastebinComponent implements OnInit {

  title: string = "Pastebin Application";
  pastebin: Pastebin[] = [];

  constructor(public pastebinServ: PastebinService) { }


 //loadPastebin() is called on init
  ngOnInit() {
      this.loadPastebin();
  }

  public loadPastebin() {
     //invokes pastebin service's getPastebin() method and stores the response in `pastebin` property
  	 this.pastebinServ.getPastebin().then(pastebin => this.pastebin = pastebin);
     
  }

  //This will be invoked when the child emits addPasteSuccess event
 public onAddPaste(newPaste: Pastebin) {
   console.log("Test");
    this.pastebin = this.pastebin.concat(newPaste);
  }

    public onUpdatePaste(newPaste: Pastebin) {
    this.pastebin.map((paste)=> { 
       if(paste.id==newPaste.id) {
         paste = newPaste;
       } 
    })
  }

  public onDeletePaste(p: Pastebin) {
   this.pastebin= this.pastebin.filter(paste => paste !== p);
   
  }
}