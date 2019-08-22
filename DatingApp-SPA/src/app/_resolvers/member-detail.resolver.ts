import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService,
              private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(catchError(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return of(null);
    }));
  }
}
