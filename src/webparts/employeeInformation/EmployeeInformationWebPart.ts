
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import {SPHttpClient, SPHttpClientResponse} from  '@microsoft/sp-http';
import * as strings from 'EmployeeInformationWebPartStrings';
import EmployeeInformation from './components/EmployeeInformation';
import { IEmployeeInformationProps } from './components/IEmployeeInformationProps';
import styles from './components/EmployeeInformation.module.scss';


export interface IEmployeeInformationWebPartProps {
  description: string;
}

export interface ISPList {  
  value: ISPListItem[];  
}  
export interface ISPListItem {  
  Title: string;  
  Office_x0020_: string;  
  Address: string;  
  Phone_x0020_Number: string;  
  Email:string;
  Manager:string;
  Emergency_x0020_Contact_x0020_:string;
  Id:string;
} 

export default class EmployeeInformationWebPart extends BaseClientSideWebPart<IEmployeeInformationWebPartProps>  {
  // private _getListData(): Promise<ISPList> {  
  //   return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Employee Information')/Items?$select=Title,Office_x0020_,Address,Phone_x0020_Number,Email,Manager/Title,Emergency_x0020_Contact_x0020_/Title&$expand=Manager,Emergency_x0020_Contact_x0020_`, SPHttpClient.configurations.v1)  
  //       .then((response: SPHttpClientResponse) => {   
          
  //         return response.json();  
  //       });  
  //   }  

  
  //   private _renderList(items: ISPListItem[]): void {  
    
  //     let html: string = '<table class="TFtable" border=1 width=100% style="border-collapse: collapse;">';  
  //     html += `<th>Name</th><th>Office</th><th>Phone Number</th><th>Address</th><th>Email</th><th>Manager</th><th>Emergency Contact</th><th>All Data</th>`;  
  //     items.forEach((item: ISPListItem) => {  
  //       html += `  
  //            <tr>  
  //           <td>${item.Title}</td>  
  //           <td>${item.Office_x0020_}</td>  
  //           <td>${item.Phone_x0020_Number}</td>  
  //           <td>${item.Address}</td>
  //           <td>${item.Email}</td>  
  //           <td>${item.Manager["Title"]}</td>
  //           <td>${item.Emergency_x0020_Contact_x0020_["Title"]}</td> 
  //           <td></td>
  //           </tr>  
  //           `;  
  //     });  
  //     html += `</table>`;  
  //     const listContainer: Element = this.domElement.querySelector('#spListContainer');  
  //     listContainer.innerHTML = html;  
  //   }   

  //   private _renderListAsync(): void {  
      
  //        this._getListData()  
  //       .then((response) => {  
  //         this._renderList(response.value);  
  //       });  
  // }
    


   public render(): void {

    const element: React.ReactElement<IEmployeeInformationProps > = React.createElement(
      EmployeeInformation,
      {
        description: this.properties.description,
        context:this.context
      }
    );
    ReactDom.render(element, this.domElement,);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
