import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rental-modal',
  templateUrl: './rental-modal.component.html',
  styleUrls: ['./rental-modal.component.css']
})
export class RentalModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'rental-modal-title'})
  }

  onClose() {
    this.close.emit();
  }

}
