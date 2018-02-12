import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ApiRequest} from 'app/api/api-request';

@NgModule({
    imports: [HttpModule],
    providers: [
      ApiRequest
    ]
})
export class ApiModule { }
