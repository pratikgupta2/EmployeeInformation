import { Component } from 'react';
import * as React from 'react';
import PanelMediumExample, * as EditForm from './EditEmployee';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IChoices,ISPListItem } from './IEmployeeInformationProps';
import { unescape } from '@microsoft/sp-lodash-subset';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export interface IItemContext{
    items:ISPListItem[];
    context:WebPartContext;
    choices:IChoices;
    reload:any;
}
  export class ShowEmployee extends Component<IItemContext>{
      constructor(props){
          super(props);
          this.state = { showPanel : true};
          
      }
    public state = {
      showPanel: true
    };
    
    public render() {
        let employeeData = this.props.items;
      return (
        
            <Table>
    <Thead>
        <Tr>
            <Th>Name</Th>
            <Th>Office</Th>
            <Th>Address</Th>
            <Th>Phone Number</Th>
            <Th>Email</Th>
            <Th>Emergency Contact</Th>
            <Th>Manager</Th>
            <Th>Edit</Th>
        </Tr>
    </Thead>
    <Tbody>
    { 
        employeeData.map((item:ISPListItem,index:number)=>{
            return <Tr>
            <Td>{item.Title}</Td>
            <Td>{item.Employee1Office}</Td>
            <Td>{unescape(item.Employee1Address)}</Td>
            <Td>{item.Employee1Phone}</Td>
            <Td>{item.Employee1Email}</Td>
            <Td>{item["Employee1EmergencyContact"]!= undefined ? item["Employee1EmergencyContact"]["Title"] : ''}</Td>
            <Td>{item["Employee1Manager"]!= undefined ?item["Employee1Manager"]["Title"] : ''}</Td>
            <Td>
            <div style={{display:"none"}}> {item["Employee1Manager"]!= undefined ? item.Employee1ManagerId=item["Employee1Manager"]["ID"]: ''}{item["Employee1EmergencyContact"]!= undefined ? item.Employee1EmergencyContactId=item["Employee1EmergencyContact"]["ID"]:''}</div>
            <PanelMediumExample item={item} context={this.props.context} choices={this.props.choices} reload={this.props.reload}></PanelMediumExample>
            </Td>
            </Tr>;
        }
    )}
        </Tbody>
    </Table>
      );
    }
  }
export default ShowEmployee;