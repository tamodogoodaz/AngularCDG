import { Component, OnInit, Output , EventEmitter, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';


@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  cities1: SelectItem[];
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  disableRemark = true;

  telephoneArray: FormArray;

  departmentFormedit = new FormGroup({
    departmentCode : new FormControl(),
        departmentName : new FormControl (null, [ Validators.maxLength(50), Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
        telephone : new FormArray ([new FormControl(null, [Validators.maxLength(11), Validators.required])]),
        province : new FormControl (null, Validators.required),
        budget : new FormControl (null, [ Validators.maxLength(11), Validators.pattern(/^[0-9]+$/), Validators.required]),
        status : new FormControl (null),
        remark : new FormControl ({value: null, disabled: true}, Validators.maxLength(255))
      });

  constructor() {
    this.cities1 = [
      {label: 'None', value: null},
      {label: 'Bangkok', value: 'Bangkok'},
      {label: 'Chonburi', value: 'Chonburi'},
  ];
    setTimeout(() => this.departmentFormedit.get('status').setValue('Y'));
   }

   addTelephone() {
     this.telephoneArray.push(new FormControl(null, [Validators.maxLength(11), Validators.required]));
   }

   deleteTelephone(item: number) {
     this.telephoneArray.removeAt(item);
   }

  ngOnInit() {
    this.telephoneArray = this.departmentFormedit.get('telephone') as FormArray;
  }

  Save() {
    // if (this.departmentFormedit.valid) {
    const FormGroupRawValue = this.departmentFormedit.getRawValue();
    const condition = {};
    Object.keys(FormGroupRawValue).forEach(key => {
      if (FormGroupRawValue[key]) {
        condition[key] = FormGroupRawValue[key];
      }
    });
    this.save.emit(condition);
    // } else {
    // Object.values(this.departmentFormedit.controls).forEach(FormControl => {
    //   FormControl.markAsTouched();
    // });
    // }
  }

  Cancel() {
    console.log('Click Cancel!');
    this.cancel.emit();
    this.departmentFormedit.reset();
  }

  checkStatus(Radio1: string, remark: HTMLInputElement) {
    if(Radio1 === 'Y') {
      //this.disableRemark = true;
      //remark.value = '';
      this.departmentFormedit.get('remark').setValue(null);
      this.departmentFormedit.get('remark').disable();
    } else {
     //this.disableRemark = null;
     this.departmentFormedit.get('remark').enable();
    }
    console.log('Check Status ' + Radio1 );
  }

}
