import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TestResult, TestResultService } from 'src/app/services/testresult.service';
import { User, UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatetimeService } from 'src/app/services/datetime.service';
import { EntranceTest, EntranceTestService } from 'src/app/services/entrancetest.service';

@Component({
  selector: 'app-testresult',
  templateUrl: './testresult.component.html',
  styleUrls: ['./testresult.component.css']
})
export class TestResultComponent implements OnInit {
  testresults: TestResult[] = [];
  testresult: TestResult = {} as TestResult;
  // subjects: Subject[] = [];
  // subject: Subject = {} as Subject;
  entrancetests: EntranceTest[] = [];
  entrancetest: EntranceTest = {} as EntranceTest;
  users: User[] = [];
  user: User = {} as User;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  // tslint:disable-next-line:max-line-length
  constructor(private testresultService: TestResultService, private entrancetestService: EntranceTestService, private userService: UserService)  {  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }
  loadData() {
    this.testresultService.getAll().subscribe(result => {
      this.testresults = result.data;
    });
    // this.subjectService.getAll().subscribe(result => {
    //   this.subjects = result.data;
    // });
    this.entrancetestService.getAll().subscribe(result => {
      this.entrancetests = result.data;
    });
    // this.userService.getAll().subscribe(result => {
    //   this.users = result.data;
    // });
    this.rerender();
  }
  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.testresultService.get(id).subscribe(result => {
        this.testresult = result.data;
        this.modal.show();
      });
    } else {
      this.testresult = {} as TestResult;
      this.modal.show();
      console.log(this.testresult);
    }
    console.log(id);
  }
  save() {
    if (this.testresult.id === undefined || this.testresult.id === 0) {
      this.testresultService.add(this.testresult).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.testresultService.update(this.testresult).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  showDeleteModal(event, id) {
    this.testresult.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }
  delete() {
    this.testresultService.delete(this.testresult.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deletedTestResult = this.testresults.find( x => x.id === this.testresult.id);
        if (deletedTestResult) {
          const index = this.testresults.indexOf(deletedTestResult);
          this.testresults.splice(index, 1);
        }
        this.deleteModal.hide();
      }
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }
}

