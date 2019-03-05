import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loginModal-content',
  template: `
  <div class="modal-header">
      <h4 class="modal-title">Admin Login</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
      <div class="form-group">
        <label for="usernameInput">Email address</label>
        <input type="email" class="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
    `
})


export class LoginModalContent {
  // @Input() name;

  constructor(public activeModal: NgbActiveModal) { }

}

@Component({
  selector: 'app-loginModal-component',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent {
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(LoginModalContent);
    // modalRef.componentInstance.name = 'World';
  }
}

