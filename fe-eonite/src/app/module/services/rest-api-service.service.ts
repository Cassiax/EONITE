import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/app/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
  });
  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/public/categoryAll`).pipe(retry(1), catchError(this.handleError));
  }

  getDomicile(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/public/domicileAll`).pipe(retry(1), catchError(this.handleError));
  }

  getCategorybyId(id:number): Observable<any>{
    let params = new HttpParams().append('id',id);
    return this.http.get(`${environment.apiUrl}/public/category`,{params:params}).pipe(retry(1), catchError(this.handleError));
  }

  getcategoryVendorId(id:number): Observable<any>{
    let params = new HttpParams().append('id',id);
    return this.http.get(`${environment.apiUrl}/public/categoryVendor`,{params:params}).pipe(retry(1), catchError(this.handleError));
  }

  getDomicilebyId(id:number): Observable<any>{
    let params = new HttpParams().append('id',id);
    return this.http.get(`${environment.apiUrl}/public/domicile`,{params:params}).pipe(retry(1), catchError(this.handleError));
  }

  postsignInUser(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/signupUser`,body);
  }

  postsignInVendor(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/signupVendor`,body);
  }

  checkEmailVendor(email:string){
    return this.http.get(`${environment.apiUrl}/auth/checkEmailVendor/${email}`).pipe(retry(1), catchError(this.handleError));
  }

  updateProfileVendor(body: any): Observable<any>{
    return this.http.put(`${environment.apiUrl}/vendor/updateProfileVendor`,body,{headers:this.headers});
  }

  checkPasswordVendor(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/vendor/checkPasswordVendor`,body,{headers:this.headers});
  }

  changePasswordVendor(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/vendor/changePasswordVendor`,body,{headers:this.headers});
  }

  getprofileVendor(id:number){
    let params = new HttpParams().append('id',id);
    let path = `${environment.apiUrl}/vendor/vendorProfile`;
    const request = new HttpRequest('GET',path,{params:params,headers:this.headers})
    return this.http.request(request).pipe(timeout(200000));
  }

  getProductbyVendorId(id:number){
    let params = new HttpParams().append('id',id);
    let path = `${environment.apiUrl}/public/getProductbyVendorId`;
    const request = new HttpRequest('GET',path,{params:params})
    return this.http.request(request).pipe(timeout(200000));
  }

  getDetailProductById(id: number){
    let params = new HttpParams().append('id',id);
    let path = `${environment.apiUrl}/public/getProductbyId`;
    const request = new HttpRequest('GET',path,{params:params})
    return this.http.request(request).pipe(timeout(200000));
  }

  addProduct(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/vendor/addProduct`,body,{headers:this.headers});
  }

  updateProduct(body: any): Observable<any>{
    return this.http.put(`${environment.apiUrl}/vendor/updateProduct`,body,{headers:this.headers});
  }

  loginUser(body: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/signinUser`,body);
  }

  loginVendor(body: any): Observable<any>{
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    return this.http.post(`${environment.apiUrl}/auth/signinVendor`,body,{headers:headers});
  }

  refreshToken(refreshToken: any): Observable<any>{
    let body :token = {};
    body.token = refreshToken;
    return this.http.post(`${environment.apiUrl}/auth/refresh`,JSON.stringify(body), {headers: this.headers});
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

export class token{
  token?:string;
}
