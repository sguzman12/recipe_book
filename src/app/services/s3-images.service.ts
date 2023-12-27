import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class S3ImagesService {
  private apiUrl = 'http://localhost:3000/api/s3URL'
  private imageUrlSubject = new BehaviorSubject<string>(null)

  imageUrl$ = this.imageUrlSubject.asObservable()

  constructor(private http: HttpClient) {}

  // GET Secure URL from server for S3 bucket
  retrieveURL(imageType: string): Observable<any> {
    const params = { imageType }
    return this.http.get(this.apiUrl, { params })
  }

  postImage(imageFile: File): Observable<any> {
    const imageType = imageFile.type.split('/')[1]
    return this.retrieveURL(imageType).pipe(
      switchMap((data: any) => {
        const url = data.url
        const fullMimeType = imageFile.type
        const imageUrl = url.split('?')[0]

        console.log('URL Returned: ', url)
        console.log('Full MIME Type: ', fullMimeType)
        this.imageUrlSubject.next(imageUrl)

        return this.http.put(url, imageFile)
      }),
    )
  }
}
