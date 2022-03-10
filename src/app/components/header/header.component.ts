import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'global-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() switchRol: boolean;

  ngOnInit(): void {}

  singOut() {
    // this.apiBienestarService.logout().subscribe(
    //   (response) => {
    //     console.log(response);
    //     localStorage.removeItem('userToken');
    //     window.location.href = this.apiBienestarService.loginURL;
    //   },
    //   (error) => {
    //     window.location.href = this.apiBienestarService.loginURL;
    //   },
    //   () => {
    //     window.location.href = this.apiBienestarService.loginURL;
    //   }
    // );
  }
}
