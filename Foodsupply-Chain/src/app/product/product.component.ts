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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { productService } from './product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [productService]
})
export class productComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  productId = new FormControl('', Validators.required);
  productStartingMin = new FormControl('', Validators.required);
  expectedEndingMins = new FormControl('', Validators.required);
  productStatus = new FormControl('', Validators.required);
  activeParticipantslist = new FormControl('', Validators.required);
  HistoryOfAllReports = new FormControl('', Validators.required);
  HistoryOflateResponsiblesReports = new FormControl('', Validators.required);

  constructor(public serviceproduct: productService, fb: FormBuilder) {
    this.myForm = fb.group({
      productId: this.productId,
      productStartingMin: this.productStartingMin,
      expectedEndingMins: this.expectedEndingMins,
      productStatus: this.productStatus,
      activeParticipantslist: this.activeParticipantslist,
      HistoryOfAllReports: this.HistoryOfAllReports,
      HistoryOflateResponsiblesReports: this.HistoryOflateResponsiblesReports
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceproduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'supplychain.product',
      'productId': this.productId.value,
      'productStartingMin': this.productStartingMin.value,
      'expectedEndingMins': this.expectedEndingMins.value,
      'productStatus': this.productStatus.value,
      'activeParticipantslist': this.activeParticipantslist.value,
      'HistoryOfAllReports': this.HistoryOfAllReports.value,
      'HistoryOflateResponsiblesReports': this.HistoryOflateResponsiblesReports.value
    };

    this.myForm.setValue({
      'productId': null,
      'productStartingMin': null,
      'expectedEndingMins': null,
      'productStatus': null,
      'activeParticipantslist': null,
      'HistoryOfAllReports': null,
      'HistoryOflateResponsiblesReports': null
    });

    return this.serviceproduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'productId': null,
        'productStartingMin': null,
        'expectedEndingMins': null,
        'productStatus': null,
        'activeParticipantslist': null,
        'HistoryOfAllReports': null,
        'HistoryOflateResponsiblesReports': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'supplychain.product',
      'productStartingMin': this.productStartingMin.value,
      'expectedEndingMins': this.expectedEndingMins.value,
      'productStatus': this.productStatus.value,
      'activeParticipantslist': this.activeParticipantslist.value,
      'HistoryOfAllReports': this.HistoryOfAllReports.value,
      'HistoryOflateResponsiblesReports': this.HistoryOflateResponsiblesReports.value
    };

    return this.serviceproduct.updateAsset(form.get('productId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceproduct.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceproduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'productId': null,
        'productStartingMin': null,
        'expectedEndingMins': null,
        'productStatus': null,
        'activeParticipantslist': null,
        'HistoryOfAllReports': null,
        'HistoryOflateResponsiblesReports': null
      };

      if (result.productId) {
        formObject.productId = result.productId;
      } else {
        formObject.productId = null;
      }

      if (result.productStartingMin) {
        formObject.productStartingMin = result.productStartingMin;
      } else {
        formObject.productStartingMin = null;
      }

      if (result.expectedEndingMins) {
        formObject.expectedEndingMins = result.expectedEndingMins;
      } else {
        formObject.expectedEndingMins = null;
      }

      if (result.productStatus) {
        formObject.productStatus = result.productStatus;
      } else {
        formObject.productStatus = null;
      }

      if (result.activeParticipantslist) {
        formObject.activeParticipantslist = result.activeParticipantslist;
      } else {
        formObject.activeParticipantslist = null;
      }

      if (result.HistoryOfAllReports) {
        formObject.HistoryOfAllReports = result.HistoryOfAllReports;
      } else {
        formObject.HistoryOfAllReports = null;
      }

      if (result.HistoryOflateResponsiblesReports) {
        formObject.HistoryOflateResponsiblesReports = result.HistoryOflateResponsiblesReports;
      } else {
        formObject.HistoryOflateResponsiblesReports = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'productId': null,
      'productStartingMin': null,
      'expectedEndingMins': null,
      'productStatus': null,
      'activeParticipantslist': null,
      'HistoryOfAllReports': null,
      'HistoryOflateResponsiblesReports': null
      });
  }

}
