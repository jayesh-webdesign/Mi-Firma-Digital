import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('router') != 'user-profile') {
      console.log(sessionStorage.getItem('router'));
      this.router.navigate(['/']);
    }
  }

}
