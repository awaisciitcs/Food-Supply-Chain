/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { catagoryComponent } from './catagory/catagory.component';
import { productComponent } from './product/product.component';

import { AgentComponent } from './Agent/Agent.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { DistributorComponent } from './Distributor/Distributor.component';
import { WarehouseManagerComponent } from './WarehouseManager/WarehouseManager.component';
import { MartAdminComponent } from './MartAdmin/MartAdmin.component';

import { createStaffComponent } from './createStaff/createStaff.component';
import { startProcessComponent } from './startProcess/startProcess.component';
import { createproductComponent } from './createproduct/createproduct.component';
import { endProcessComponent } from './endProcess/endProcess.component';
import { createcatagoryComponent } from './createcatagory/createcatagory.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    catagoryComponent,
    productComponent,
    AgentComponent,
    ManufacturerComponent,
    DistributorComponent,
    WarehouseManagerComponent,
    MartAdminComponent,
    createStaffComponent,
    startProcessComponent,
    createproductComponent,
    endProcessComponent,
    createcatagoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
