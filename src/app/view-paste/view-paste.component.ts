import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pastebin, Languages } from '../pastebin';
import { PastebinService } from '../pastebin.service';

@Component({
  selector: 'app-view-paste',
  templateUrl: './view-paste.component.html',
  styleUrls: ['./view-paste.component.css']
})
/* view-paste.component.ts */

export class ViewPasteComponent implements OnInit {

  @Input() paste: Pastebin;
  @Output() updatePasteSuccess: EventEmitter<Pastebin> = new EventEmitter<Pastebin>();
  @Output() deletePasteSuccess: EventEmitter<Pastebin> = new EventEmitter<Pastebin>();

  showPasteModal:boolean ;
  editEnabled: boolean;
  readonly languages = Languages;
  
  constructor(private pasteServ: PastebinService) { }

  ngOnInit() {
      this.showPasteModal = false;
  	  this.editEnabled = false;
  }
  //To make the modal window visible
  public showPaste() {
  	this.showPasteModal = true;
  }
  //Invoked when the edit button is clicked
  public onEdit() {
  	this.editEnabled=true;
  }
  //Invoked when the save button is clicked
  public onSave() {
 	this.pasteServ.updatePaste(this.paste).then( () => {
  		this.editEnabled= false;
        this.updatePasteSuccess.emit(this.paste);
  	})
  }
 //Invoked when the close button is clicked
  public onClose() {
  	this.showPasteModal = false;
  }
 
 //Invoked when the delete button is clicked
  public onDelete() {
	  this.pasteServ.deletePaste(this.paste).then( () => {
        this.deletePasteSuccess.emit(this.paste);
 	    this.onClose();
 	  })
  }
  
}