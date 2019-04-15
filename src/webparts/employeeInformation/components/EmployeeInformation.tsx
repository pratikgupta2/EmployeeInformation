import * as React from 'react';
import { IEmployeeInformationProps,ISPList,IChoices} from './IEmployeeInformationProps';
import {SPHttpClient, SPHttpClientResponse} from  '@microsoft/sp-http';
import { ShowEmployee}  from './ShowEmployee';

export interface IEmployeeInformationState {
  data: ISPList;
  choice:IChoices;
  reload:boolean;
}

export default class EmployeeInformation extends React.Component<IEmployeeInformationProps, IEmployeeInformationState> {

  constructor(props)
  {
    super(props);
    this.state = {data:null,choice:null,reload:false};
    this._reload = this._reload.bind(this);
  }

   public componentWillMount(){
    let choices:IChoices = null;
    let itemdata:ISPList = null;
    this._getListData().then(
      response => {
        // this._getListData = null;
        itemdata=response;
        this._getChoicedata().then(
          r => {
            // this._getChoicedata = null;
            choices=r;
            this.setState({data:itemdata,choice:choices});
          }
        );
      }
    );
    
    
  }

  private _getChoicedata():Promise<IChoices>{
    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Employee Details')/Fields?$select=Choices&$filter=InternalName%20eq%20%27Employee1Office%27`,SPHttpClient.configurations.v1 )
    .then((response:SPHttpClientResponse) =>{
      return response.json();
    });
  }
  private _getListData(): Promise<ISPList> {  
    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Employee Details')/Items?$select=ID,Title,Employee1Office,Employee1Address,Employee1Phone,Employee1Email,Employee1Manager/EMail,Employee1Manager/Title,Employee1Manager/ID,Employee1EmergencyContact/Title,Employee1EmergencyContact/EMail,Employee1EmergencyContact/ID&$expand=Employee1Manager,Employee1EmergencyContact`, SPHttpClient.configurations.v1)  
        .then((response: SPHttpClientResponse) => {   
          return response.json();  
        });  
    }  

    private _reload(){
      this._getListData().then(response => {
        this.setState({data:response});
        });
    }

  public render(): React.ReactElement<IEmployeeInformationProps> {
    let edata : any;
    if(this.state!=null)
    {
       if(this.state.data!=null && this.state.choice!=null)
        edata = <ShowEmployee items={this.state.data.value} choices={this.state.choice} context={this.props.context} reload={this._reload}></ShowEmployee>;
    }
    else
    {
      
      edata = "Loading data...";
    }
    return (
            <div>{ edata}</div>
    );
  }
}
