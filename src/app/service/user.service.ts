import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInterface } from '../interfaces/User';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiurl="http://localhost:3000/user";
  constructor(private http: HttpClient) {}

  getUser():Observable<UserInterface[]>{
    const url="http://localhost:3000/user";
    return this.http.get<UserInterface[]>(url)
  }

  saveUser(user:UserInterface):Observable<UserInterface>{
    const url="http://localhost:3000/user";
    return this.http.post<UserInterface>(url,user)
  }


  loginUser(username: string, password: string): Observable<UserInterface | null> {
    return this.http.get<UserInterface[]>(this.apiurl).pipe(
      map(users => {
        const user = users.find(u => u.username === username);
        if (!user) {
          console.error("User not found");
          return null;
        }
        if (!user.password) {
          console.error("Password field is missing for user:", username);
          return null;
        }
        return user.password.toString() === password ? user : null;
      })
    );
  }
  


  getUserByUsername(username: string): Observable<UserInterface | undefined> {
    return this.http.get<UserInterface[]>(this.apiurl).pipe(
      map(users => users.find(user => user.username === username)) // Find the user
    );
  }
  

  updateUserProfile(username: string, updatedData: any): Observable<any> {
    return this.getUserByUsername(username).pipe(
      switchMap(user => {
        if (!user || !user.id) {
          throw new Error("User not found");
        }
        const updatedUser = { ...user, ...updatedData }; // Preserve existing data
        return this.http.put(`${this.apiurl}/${user.id}`, updatedUser);
      })
    );
  }
  
  
  
  
}
