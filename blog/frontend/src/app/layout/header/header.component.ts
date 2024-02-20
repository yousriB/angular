import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId='';

  constructor(public _auth:AuthService , private router:Router) { }

  ngOnInit(): void {

  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
 

