import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { DepartmentTableComponent } from "./department-table/department-table.component";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"]
})
export class DepartmentComponent implements OnInit {
  @Input() hp = 0;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @ViewChild("departmentTable") departmentTable: DepartmentTableComponent;

  constructor() {
    console.log("constructor work!!");
  }

  ngOnInit() {
    console.log("ngOn work!!");
  }

  incre() {
    console.log("Click Plus!");
    this.hp++;
    this.increase.emit(this.hp);
  }

  incre2() {
    console.log("Click Delete!");
    this.hp -= 2;
    this.decrease.emit(this.hp);
  }

  onCancel() {
    console.log();
  }

  searchTopic(condition: any) {
    console.log("search topic now!!", condition);
    this.departmentTable.query(condition);
  }
  Display() {
    if (this.departmentTable.Display === true) {
      this.departmentTable.Display = false;
    } else {
      this.departmentTable.Display = true;
    }
  }
}
