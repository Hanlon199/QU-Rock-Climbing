import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eventRegister-modal-content',
  template: `
  <div class="modal-header">
      <h4 class="modal-title">Event Register</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
      <div class="form-group">
        <label for="nameInput">Your Name</label>
        <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Enter Full Name">
      </div>
      <div class="form-group">
        <label for="member">Member? (Choose one)</label>
        <br>
        <label class="radio-inline"><input type="checkbox" value="">Yes</label>
        <label class="radio-inline" style="padding-left:10px;"><input type="checkbox" value="">No</label>
      </div>
      <div class="form-group">
        <label for="belayCert">Belay Certified? (Choose one)</label>
        <br>
        <label class="radio-inline"><input type="checkbox" value="">Yes</label>
        <label class="radio-inline" style="padding-left:10px;"><input type="checkbox" value="">No</label>
      </div>
      <div class="form-group">
        <label for="driver">Driver? (Choose one)</label>
        <br>
        <label class="radio-inline"><input type="checkbox" value="">Yes</label>
        <label class="radio-inline" style="padding-left:10px;"><input type="checkbox" value="">No</label>
      </div>
      <div>
        <button type="submit" class="btn btn-primary" style="float:right">Submit</button>
      </div>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
    `
})

export class EventRegisterModalContent {

  constructor(public activeModal: NgbActiveModal) { }

}

@Component({
  selector: 'app-event-register-modal-component',
  templateUrl: './event-register-modal.component.html',
  styleUrls: ['./event-register-modal.component.css']
})

export class EventRegisterModalComponent {
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(EventRegisterModalContent);
  }
}

