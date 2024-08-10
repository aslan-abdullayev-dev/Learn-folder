import { Component } from '@angular/core';
import { ITest } from "./test-component.model";

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [],
  templateUrl: './test-component.component.html',
})
export class TestComponentComponent implements ITest {
  id = 0
  name = ""
  email = ""
  password: ITest["password"] = 1;

  constructor() {
    // this.password = "";
  }
}
