import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';2

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  // 💡 Cuando la app se carga por primera vez, y no tenemos autenticación, el user va a estar nulo. A veces tenemos el user, a veces no.
  private user?: User;


  constructor( private http: HttpClient ) { }

  // 💡 Cuando es el caso de que no se retorne nada, hay que establecer que puede también retornar un undefined.
  get currentUser(): User | undefined {
    if( !this.user ) return;
    return structuredClone( this.user );
  }


  // 💡 La finalidad principal de esta función, sólo es retornar un Observable, mientras no se altere su finalidad pricipal, podemos agregarle efectos secundarios con .tap
  login( email: string, password: string ): Observable<User> {
    return this.http.get<User>( `${ this.baseUrl }/users/1` )
      .pipe(
        // 💡 Esta función altera la finalidad principal de retornar un Observable? No, entonces es un efecto secundario. this.user equivale ahora a baseUrl/users/1
        tap( user => this.user = user ),
        tap( user => localStorage.setItem( 'token', 'asd.asd.asd' ) ),
      );
  }


  logout() {
    this.user = undefined;
    localStorage.clear();
  }


  checkAuthentication(): Observable<boolean>  {

    if( !localStorage.getItem('token') ) return of(false);

    // 💡 Como quiero retornar un booleano y no el get<User>, entonces usamos _doble negación_
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        // 💡 ¿Por qué la doble negación? Porque como queremos devolver un booleano, entonces, si queremos retornar nada más _user_, retornaria el objeto user, y si retornanmos !user, ya no retornaría el objeto, ahora retornaría un _false_, ¿y qué buscamos nosotros? un _true_, entonces hacemos la doble negación.
        map( user => !!user ),
        catchError( err => of(false) )
      )
  }

}




