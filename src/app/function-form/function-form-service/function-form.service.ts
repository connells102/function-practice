import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionFormService {
  private uri: string = 'https://sample-function-app-sac.azurewebsites.net/api/PracticeHttpTrigger?code=mu1mykKrVH8b2HTcb7e2gasfZJNf2FeXIctnMXzhneaCfmOqJxNleg==';
  public item: string = '';
  public price: string = '';

  constructor(private http: HttpClient) { }

  getResponseString(): Observable<any> {
    return this.http.get(`${this.uri}&item=${this.item}&price=${this.price}`, { responseType: 'text' } );
  }
}
