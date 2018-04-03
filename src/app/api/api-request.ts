import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ApiRequest {

    private API_VERSION = 1;

    constructor(private http: Http) { }

    public async get(endpoint: string): Promise<any> {
        const url = this.makeUrl(endpoint);

        const result = await this.http.get(url).toPromise();

        if (result) {
          return result.json().data;
        }
    }

    public async update(endpoint: string, data: any): Promise<void> {
        const url = this.makeUrl(endpoint);

        await this.http.put(url, data).toPromise()
    }

    public async delete(endpoint: string): Promise<void> {
        const url = this.makeUrl(endpoint);

        await this.http.delete(url).toPromise();
    }

    public async create(endpoint: string, data: any): Promise<void> {
        const url = this.makeUrl(endpoint);

        await this.http.post(url, data).toPromise()
    }

    private makeUrl(endpoint: string): string {
        const origin: string = location.origin;
        return `${origin}/api/v${this.API_VERSION}/${endpoint}`;
    }
}
