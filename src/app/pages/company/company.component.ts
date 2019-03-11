import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { Company, CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[] = [];
  company: Company = {} as Company;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result.data;
    });
  }
  showModal($event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) { // Show GUI for Update
      this.companyService.get(id).subscribe(result => {
        this.company = result.data;
        this.modal.show();
      });
    } else {  // Show GUI for Add new
      this.company = {} as Company;
      this.modal.show();
    }
  }
  showDeleteModal($event, id) {
    if (event) {
      event.preventDefault();
    }
    this.company.companyid = id;
    this.deleteModal.show();
  }
  save() {
    if (this.company.companyid === undefined || this.company.companyid === 0) {
      this.companyService.add(this.company).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.companyService.update(this.company).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  delete(id) {
    this.companyService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.companies.find(x => x.companyid === id);
        if (deleteCompany) {
          const index = this.companies.indexOf(deleteCompany);
          this.companies.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
