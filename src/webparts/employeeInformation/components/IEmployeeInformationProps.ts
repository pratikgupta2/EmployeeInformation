import {
  WebPartContext
} from '@microsoft/sp-webpart-base';

export interface IEmployeeInformationProps {
  description: string;
  context:WebPartContext;
}

export interface ISPList {  
  value: ISPListItem[];  
}  

export interface IChoices{
  value:IChoice[];
}

export interface IChoice{
  choice:string;
}


export interface ISPListItem {  
  Title: string;  
  Employee1Office: string;  
  Employee1Address: string;  
  Employee1Phone: string;  
  Employee1Email:string;
  Employee1ManagerId:number;
  Employee1EmergencyContactId:number;
  ID:number;
} 
