import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-format-error',
  templateUrl: './format-error.component.html',
  styleUrls: ['./format-error.component.scss']
})
export class FormatErrorComponent implements OnInit {
  @Input() errorList;
  formattedErrors: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
    this.formattedErrors = [];
    console.log(this.errorList)
    if (this.errorList.errors) {
      for (let field in this.errorList.errors) {
        this.formattedErrors.push(`${field} ${this.errorList.errors[field]}`);
      }
    }
  }
}
