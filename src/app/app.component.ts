import { Component } from '@angular/core';
import{ GlobalConstants } from './common/global-contants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalConstants.siteTitle;
}
