import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showProgress = true;
  title = 'RoutingDemo';

}
