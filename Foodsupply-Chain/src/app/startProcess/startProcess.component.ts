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
import { startProcessService } from './startProcess.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-startprocess',
  templateUrl: './startProcess.component.html',
  styleUrls: ['./startProcess.component.css'],
  providers: [startProcessService]
})
export class startProcessComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  participantId = new FormControl('', Validators.required);
  participantType = new FormControl('', Validators.required);
  productId = new FormControl('', Validators.required);
  processType = new FormControl('', Validators.required);
  startTime = new FormControl('', Validators.required);
  day = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicestartProcess: startProcessService, fb: FormBuilder) {
    this.myForm = fb.group({
      participantId: this.participantId,
      participantType: this.participantType,
      productId: this.productId,
      processType: this.processType,
      startTime: this.startTime,
      day: this.day,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicestartProcess.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'supplychain.startProcess',
      'participantId': this.participantId.value,
      'participantType': this.participantType.value,
      'productId': this.productId.value,
      'processType': this.processType.value,
      'startTime': this.startTime.value,
      'day': this.day.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'participantId': null,
      'participantType': null,
      'productId': null,
      'processType': null,
      'startTime': null,
      'day': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicestartProcess.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'participantId': null,
        'participantType': null,
        'productId': null,
        'processType': null,
        'startTime': null,
        'day': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'supplychain.startProcess',
      'participantId': this.participantId.value,
      'participantType': this.participantType.value,
      'productId': this.productId.value,
      'processType': this.processType.value,
      'startTime': this.startTime.value,
      'day': this.day.value,
      'timestamp': this.timestamp.value
    };

    return this.servicestartProcess.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicestartProcess.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicestartProcess.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'participantId': null,
        'participantType': null,
        'productId': null,
        'processType': null,
        'startTime': null,
        'day': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.participantId) {
        formObject.participantId = result.participantId;
      } else {
        formObject.participantId = null;
      }

      if (result.participantType) {
        formObject.participantType = result.participantType;
      } else {
        formObject.participantType = null;
      }

      if (result.productId) {
        formObject.productId = result.productId;
      } else {
        formObject.productId = null;
      }

      if (result.processType) {
        formObject.processType = result.processType;
      } else {
        formObject.processType = null;
      }

      if (result.startTime) {
        formObject.startTime = result.startTime;
      } else {
        formObject.startTime = null;
      }

      if (result.day) {
        formObject.day = result.day;
      } else {
        formObject.day = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'participantId': null,
      'participantType': null,
      'productId': null,
      'processType': null,
      'startTime': null,
      'day': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
