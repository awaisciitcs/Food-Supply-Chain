import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace supplychain{
   export class User {
      emailId: string;
      password: string;
   }
   export class Agent extends Participant {
      userId: string;
      lastReport: DailyReport;
      dailyReport: DailyReport[];
      userData: User;
   }
   export class Manufacturer extends Participant {
      userId: string;
      lastReport: DailyReport;
      dailyReport: DailyReport[];
      userData: User;
   }
   export class Distributor extends Participant {
      userId: string;
      lastReport: DailyReport;
      dailyReport: DailyReport[];
      userData: User;
   }
   export class WarehouseManager extends Participant {
      userId: string;
      lastReport: DailyReport;
      dailyReport: DailyReport[];
      userData: User;
   }
   export class MartAdmin extends Participant {
      userId: string;
      lastReport: DailyReport;
      dailyReport: DailyReport[];
      userData: User;
   }
   export enum ParticipantType {
      Agent,
      Manufacturer,
      Distributor,
      WarehouseManager,
      MartAdmin,
   }
   export enum ProcessType {
      ViewProductDetails,
      CompleteCatagoriesInformation,
      ProductConfirmationAfterReceiving,
      CleaningOperationsOfMart,
      ProductShelfComplitionProcess,
      PaymentsByMartAdmin,
      ViewReports,
      CompleteProductInformation,
      ProductManufacturing,
      AddSampleProductDetails,
      AddProductBatchDetails,
      ProductPackaging,
      DistributorInformationBeforePickUp,
      AddAgentInformationInWarehouseStock,
      BatchStatusBeforeShipment,
      UpdateStatusOfDelivery,
      ProductBatchStatus,
      DeliveredProduct,
      AddDeliveryTimeAndDate,
      FuelingDuringDistrbution,
      PackagingOperationsOnProduct,
      ProductDistribution,
   }
   export enum DutyStatus {
      OnTime,
      Late,
      TooEarly,
   }
   export enum Status {
      OnHold,
      Approved,
      Rejected,
   }
   export class DailyReport {
      day: Day;
      processStatus: ProcessStatus;
   }
   export class Time {
      startTime: Date;
      endTime: Date;
   }
   export class catagory extends Asset {
      catagoryId: string;
      flightList: string[];
   }
   export class ActiveParticipants {
      participantId: string;
      currentProcess: ProcessType;
      processTime: Time;
   }
   export class product extends Asset {
      productId: string;
      productStartingMin: number;
      expectedEndingMins: number;
      productStatus: Status;
      activeParticipantslist: ActiveParticipants[];
      HistoryOfAllReports: DailyReport[];
      HistoryOflateResponsiblesReports: DailyReport[];
   }
   export enum Day {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
   }
   export class ProcessStatus {
      time: Time;
      processType: ProcessType;
      dutyStatus: DutyStatus;
   }
   export class createStaff extends Transaction {
      participantType: ParticipantType;
      userId: string;
      emailId: string;
      password: string;
   }
   export class startProcess extends Transaction {
      participantId: string;
      participantType: ParticipantType;
      productId: string;
      processType: ProcessType;
      startTime: Date;
      day: Day;
   }
   export class createproduct extends Transaction {
      catagoryId: string;
      productId: string;
      productStatus: Status;
   }
   export class endProcess extends Transaction {
      participantId: string;
      participantType: ParticipantType;
      productId: string;
      processType: ProcessType;
      endTime: Date;
      day: Day;
   }
   export class createcatagory extends Transaction {
      catagoryId: string;
   }
// }
