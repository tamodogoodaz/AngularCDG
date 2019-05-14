import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Department } from '../Shared/department';
import { DepartmentService } from '../Shared/department.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cities1: SelectItem[];
  @Input() topic = 'Search Department';
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();
  disableRemark = true;
  departmentForm = new FormGroup({
    departmentName : new FormControl (null, [this.FuckValidator('Fuck'), this.FuckValidator('fuck') , this.FuckValidator('fucK') , this.FuckValidator('FUck') , Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    province : new FormControl (null),
    budgetFrom : new FormControl (null, Validators.pattern(/^[0-9]+$/)),
    budgetTo: new FormControl (null, Validators.pattern(/^[0-9]+$/)),
    status: new FormControl ('Y'),
    telephone: new FormControl (null, Validators.pattern(/^\d+$/)),
    remark: new FormControl ({value: null, disabled: true}, Validators.maxLength(20))
  });


  constructor(private service: DepartmentService) {
    this.cities1 = [
      {label: 'None', value: null},
      {label: 'Bangkok', value: { id: 1, name: 'Bangkok', code: 'BK'}},
      {label: 'Chonburi', value: { id: 2, name: 'Chonburi', code: 'CB'}},
  ];
   }

  ngOnInit() {
   this.departmentForm.get('department');

  }

  // FuckValidator(control: AbstractControl): ValidationErrors {
  //   const departmentFuck: string = control.value;
  //   if (departmentFuck && departmentFuck.match('Fuck')) {
  //     return {checkText: true};
  //   }
  //   return null;
  // }
  FuckValidator(word: string): ValidatorFn {
    // type ValidatorFn = (control: AbstractControl)=>ValidationErrors |null
    return (control: AbstractControl): ValidationErrors => {
      const departmentName: string = control.value;
      if (departmentName && departmentName.indexOf(word) !== -1) {
        return {checkText: true};
      }
  // ถ้า return เป็น object จะหมายถึง validate ไม่ผ่าน
  // ถ้า return null หมายถึง validate ผ่าน
      return null;
    };
  }

  Search() {
    console.log('Click Search!');
    if (this.departmentForm.valid) {
      const FormGroupRawValue = this.departmentForm.getRawValue();
      const condition = {};
      Object.keys(FormGroupRawValue).forEach(key => {
        if (FormGroupRawValue[key]) {
          condition[key] = FormGroupRawValue[key];
        }
      });
      this.search.emit(condition);
    } else {
      Object.values(this.departmentForm.controls).forEach(formControl => {
        formControl.markAsTouched();
      });
    }
  }

  Display() {
    this.Display()
  }

  Cancel() {
    console.log('Click Cancel!');
    this.cancel.emit();
    this.departmentForm.reset();
  }

  checkStatus(Radio1: string, remark: HTMLInputElement) {
    if(Radio1 === 'Y') {
      //this.disableRemark = true;
      //remark.value = '';
      this.departmentForm.get('remark').setValue(null);
      this.departmentForm.get('remark').disable();
    } else {
     //this.disableRemark = null;
     this.departmentForm.get('remark').enable();
    }
    console.log('Check Status ' + Radio1 );
  }


}
