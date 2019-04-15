import { DefaultButton, Button,PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { ISPListItem, IChoices } from './IEmployeeInformationProps';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { unescape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IPanelMediumExampleState {
  showPanel: boolean;
  Title: string;  
  Employee1Office: string;  
  Employee1Address: string;  
  Employee1Phone: string;  
  Employee1Email:string;
  Employee1ManagerId:number;
  Employee1EmergencyContactId:number;
  ID:number;
}

export interface IItemContext{
  item:ISPListItem;
  context:WebPartContext;
  choices:IChoices;
  reload:any;
}

//  interface IDropdown {
//    key :string;
//    text : string;
//  }
export default class PanelMediumExample extends React.Component<IItemContext, IPanelMediumExampleState> {
  constructor(props){
    super(props);
    
    this._save = this._save.bind(this);
    this._validateTitle = this._validateTitle.bind(this);
    this._validateManager=this._validateManager.bind(this);
    this._validateAddress = this._validateAddress.bind(this);
    this._validateEmail = this._validateEmail.bind(this);
    this._validateTitle = this._validateTitle.bind(this);
    this._validatePhone = this._validatePhone.bind(this);
    this._validateEmergencyContact = this._validateEmergencyContact.bind(this);
    this._onChange = this._onChange.bind(this);
}


  public state:IPanelMediumExampleState = {
    showPanel: false,
    Employee1Address : this.props.item.Employee1Address,
    Employee1Email: this.props.item.Employee1Email,
    Employee1EmergencyContactId : this.props.item.Employee1EmergencyContactId,
    ID:this.props.item.ID,
    Employee1ManagerId:this.props.item.Employee1ManagerId,
    Employee1Office:this.props.item.Employee1Office,
    Employee1Phone:this.props.item.Employee1Phone,
    Title:this.props.item.Title
  };

  


  private _save(){
    let id = this.state.ID;
    const body: string = JSON.stringify({  
      Title:this.state.Title,
      Employee1Phone:this.state.Employee1Phone,
      Employee1ManagerId : this.state.Employee1ManagerId,
      Employee1Address : this.state.Employee1Address,
      Employee1Email:this.state.Employee1Email,
      Employee1EmergencyContactId:this.state.Employee1EmergencyContactId,
      Employee1Office:this.state.Employee1Office
    });
    this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + '/_api/web/lists/getbytitle(\'Employee Details\')/items('+id+')',SPHttpClient.configurations.v1,
    {   
      headers: {  
        'Accept': 'application/json;odata=nometadata',  
        'Content-type': 'application/json;odata=nometadata',  
        'odata-version': '',  
        'IF-MATCH': '*',  
        'X-HTTP-Method': 'MERGE'  
      },  
      body: body  
    }).then((reponse) =>{
      console.log(this.state);
      this.props.reload();
      this._hidePanel();
    }).catch((err)=> console.log(JSON.stringify(err))); 
  }

  private _validateTitle(value:string): string {
    
    if(value.length > 0)
    {
      this.setState({Title:value});
      return '';
    }
    else  return 'Field can not be blank';
  }

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  }

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  }

  private _validateEmail(value:string): string {
    if(value.length > 0)
    {
      this.setState({Employee1Email:value});
      return '';
    }
    else  return 'Field can not be blank';
  }

  private _validatePhone(value:string): string {
    if(value.length > 0)
    {
      this.setState({Employee1Phone:value});
      return '';
    }
    else  return 'Field can not be blank';
  }

  private _validateAddress(value:string): string {
    if(value.length > 0)
    {
      this.setState({Employee1Address:value});
      return '';
    }
    else  return 'Field can not be blank';
  }
  
  private _validateManager(items: any[]) {
    if(items.length > 0)
      this.setState({Employee1ManagerId:items[0]["id"]});
  }

  private _validateEmergencyContact(items: any[]) {
    if(items.length > 0)
      this.setState({Employee1EmergencyContactId:items[0]["id"]});
  }

  
  private _onChange = (item: IDropdownOption): void => {
    this.setState({ Employee1Office: item.text });
  }

  public render() {
    let listitem =this.props.item;
    let choise : IDropdownOption[] = [];
    this.props.choices.value["0"]["Choices"].map(element => {
      choise.push({key:element,text:element});
    });
    return (
      <div>
        <PrimaryButton secondaryText="Edit information" onClick={this._showPanel} text="Edit" />
        <Panel isOpen={this.state.showPanel} onDismiss={this._hidePanel} type={PanelType.medium} headerText={listitem["Title"]}>
          <span>
            <TextField defaultValue={listitem["Title"]} label="Name" onGetErrorMessage={this._validateTitle} ></TextField><br></br>
            <TextField defaultValue={unescape(listitem["Employee1Address"])} label="Address" multiline autoAdjustHeight onGetErrorMessage={this._validateAddress}></TextField><br></br>
            <TextField defaultValue={String(listitem["Employee1Phone"])} label="Phone Number" onGetErrorMessage={this._validatePhone}></TextField><br></br>
            <TextField defaultValue={listitem["Employee1Email"]} label="Email" onGetErrorMessage={this._validateEmail}></TextField><br></br>
            <Dropdown placeHolder="select an option" label="Office" 
              options={choise} defaultSelectedKey={listitem["Employee1Office"]} onChanged={this._onChange}></Dropdown>
              <PeoplePicker
              context={this.props.context}
              titleText="Manager"
              personSelectionLimit={1}
              groupName={""} 
              showtooltip={true}
              isRequired={true}
              disabled={false}
              selectedItems={this._validateManager}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={500} 
              ensureUser={true}
              defaultSelectedUsers={[listitem["Employee1Manager"]!= undefined ? listitem["Employee1Manager"]["EMail"]:'']}
              /><br></br>
            <PeoplePicker
              context={this.props.context}
              titleText="Emergency Contact"
              personSelectionLimit={1}
              groupName={""} 
              showtooltip={true}
              isRequired={true}
              disabled={false}
              selectedItems={this._validateEmergencyContact}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={500} 
              ensureUser={true}
              defaultSelectedUsers={[listitem["Employee1EmergencyContact"]!= undefined ? listitem["Employee1EmergencyContact"]["EMail"] : '']}
              />
              <br></br>
            <PrimaryButton text="Save" onClick={this._save} style={{ marginRight: '8px' }}></PrimaryButton>
            <DefaultButton text="Cancel" onClick={this._hidePanel}></DefaultButton>
          </span>
        </Panel>
      </div>
    );
  }

  
}