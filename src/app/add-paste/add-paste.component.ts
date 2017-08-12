import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pastebin, Languages } from '../pastebin';
import { PastebinService } from '../pastebin.service';

@Component({
  selector: 'app-add-paste',
  templateUrl: './add-paste.component.html',
  styleUrls: ['./add-paste.component.css']
})
export class AddPasteComponent implements OnInit {

  @Output() addPasteSuccess: EventEmitter<Pastebin> = new EventEmitter<Pastebin>();
  showModal: boolean = false;
  newPaste: Pastebin = new Pastebin();
  languages: string[] = Languages;

  constructor(private pasteServ: PastebinService) { }

  ngOnInit() {  }
  //createPaste() gets invoked from the template. This shows the Modal
  public createPaste():void {
   
    this.showModal = true;
    
  }
  //onSave() pushes the newPaste property into the server
  public onSave():void {
    this.pasteServ.addPaste(this.newPaste).then( (response) => {
        
        this.addPasteSuccess.emit(response);
        this.onClose();
    });
  }
  //Used to close the Modal
  public onClose():void {
    this.showModal=false;
  }
}
