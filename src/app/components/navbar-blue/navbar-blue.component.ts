import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-blue',
  templateUrl: './navbar-blue.component.html',
  styleUrls: ['./navbar-blue.component.scss'],
})
export class NavbarBlueComponent implements OnInit {
  @Input() menu;
  @Input() descriptor;

  list: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openList() {
    if (this.list) {
      this.list = false;
    } else {
      this.list = true;
    }
  }

  navigateTo(route) {
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1);
  }
}
