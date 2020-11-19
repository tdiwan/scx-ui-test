import { Component } from '@angular/core';

@Component({
  selector: 'init',
  template: `<h2>scx-ui-test</h2>
<button name="start" [routerLink]='["/question/1"]' id="start"  class="btn btn-primary waves-light">Start the Quiz</button>`,
  styles: [`h2 { font-family: auto; padding-top:20px}`]
})
export class InitComponent  {
}
