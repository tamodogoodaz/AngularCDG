import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { Department } from "../Shared/department";
import { DepartmentService } from "../Shared/department.service";
import { Condition } from "selenium-webdriver";
import { DepartmentFormComponent } from "../department-form/department-form.component";
import { SelectableRow } from "primeng/table";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-department-table",
  templateUrl: "./department-table.component.html",
  styleUrls: ["./department-table.component.css"]
})
export class DepartmentTableComponent implements OnInit {
  departmentList: Department[];
  cols: any[];
  displayDialog: boolean;
  Display: boolean;

  @ViewChild("departmentform") form: DepartmentFormComponent;
  // @ViewChild('departmentForm')form departmentForm
  //[
  //   {departmentCode: 'PHP', departmentName: 'PHP' , province: 'Bangkok', budget: 2000, status: 'Y' , telephone: '021-123-3333', },
  //   {departmentCode: 'AG', departmentName: 'Anguar' , province: 'Bangkok', budget: 20000, status: 'Y' , telephone: '021-123-3333', },
  //   {departmentCode: 'TS', departmentName: 'Typescript' , province: 'Bangkok', budget: 2000, status: 'Y' , telephone: '021-123-3333', },
  //   {departmentCode: 'J', departmentName: 'Java' , province: 'Bangkok', budget: 110000, status: 'Y' , telephone: '021-123-3333', },
  //   {departmentCode: 'JS', departmentName: 'javascript' , province: 'Bangkok', budget: 25000, status: 'Y' , telephone: '021-123-3333', },
  //  ];
  constructor(public service: DepartmentService) {
    this.service
      .loadDeparmentList()
      .subscribe(response => (this.departmentList = response));
    //console.log(this.service);
  }

  ngOnInit() {
    this.query();
  }

  updateSelectedRow(payload: any) {
    payload.telephone = payload.telephone.join(", ");
    if (payload.departmentCode) {
      this.service.editDepartment(payload).subscribe(Response => {
        this.displayDialog = false;
        const index = this.departmentList.findIndex(
          department => department.departmentCode === payload.departmentCode
        );
        this.departmentList[index] = payload;
      });
    } else {
      this.service.addDepartment(payload).subscribe(Response => {
        this.departmentList.push(Response);
        this.displayDialog = false;
      });
    }
  }

  addItem() {
    this.displayDialog = true;
    this.form.departmentFormedit.reset({
      status: "Y",
      remark: { value: "", disabled: true }
    });
  }

  deletDepartment(code: string) {
    this.service.deletDepartment(code).subscribe(response => {
      const index = this.departmentList.findIndex(
        department => department.departmentCode === code
      );
      this.departmentList.splice(index, 1);
    });
  }

  query(condition?: any) {
    this.service
      .loadDeparmentList(condition)
      .subscribe(Test => (this.departmentList = Test));
  }
  onRowSelect(event: any) {
    console.log(event.data);
    const selectableRow = { ...event.data };
    const telephoneList = selectableRow.telephone.split(/\s*\,\s*/);
    selectableRow.telephone = telephoneList;
    // const loop = telephoneList.length - this.departmentList.telephoneFormArray.length;
    while (this.form.telephoneArray.length !== 0) {
      this.form.telephoneArray.removeAt(0);
    }

    for (const tel of telephoneList) {
      this.form.telephoneArray.push(
        new FormControl(null, [Validators.maxLength(11), Validators.required])
      );
    }
    this.form.departmentFormedit.patchValue(selectableRow);
    this.displayDialog = true;
  }
}
