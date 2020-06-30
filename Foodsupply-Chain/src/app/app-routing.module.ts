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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catagory', component: catagoryComponent },
  { path: 'product', component: productComponent },
  { path: 'Agent', component: AgentComponent },
  { path: 'Manufacturer', component: ManufacturerComponent },
  { path: 'Distributor', component: DistributorComponent },
  { path: 'WarehouseManager', component: WarehouseManagerComponent },
  { path: 'MartAdmin', component: MartAdminComponent },
  { path: 'createStaff', component: createStaffComponent },
  { path: 'startProcess', component: startProcessComponent },
  { path: 'createproduct', component: createproductComponent },
  { path: 'endProcess', component: endProcessComponent },
  { path: 'createcatagory', component: createcatagoryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
