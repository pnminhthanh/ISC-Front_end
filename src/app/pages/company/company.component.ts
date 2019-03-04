import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { Company, CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companies: Company[] = [];
  company: Company = {} as Company;
  @ViewChild('modalAdd') modalAdd: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result.data;
    });
  }
  showModal(event = null, modal: ModalDirective, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.companyService.get(id).subscribe(result => {
        this.company = result.data;
        modal.show();
      });
    } else {
      this.company = {} as Company;
      modal.show();
    }
  }
  save() {
    if (this.company.companyid === undefined || this.company.companyid === 0) {
      this.companyService.add(this.company).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    } else {
      this.companyService.update(this.company).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    }
  }
  delete(event = null, id) {
    event.preventDefault();
    this.companyService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.companies.find(x => x.companyid === id);
        if (deleteCompany) {
          const index = this.companies.indexOf(deleteCompany);
          this.companies.splice(index, 1);
          this.modalDelete.hide();
        }
      }
    });
  }
}
