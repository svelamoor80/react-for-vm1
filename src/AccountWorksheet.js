import React, { Component } from 'react';
import ClientPositionTable from './Client';
import './App.css';

class AccountWorksheetToolbar extends Component {
    constructor(props) {
            super(props);
            this.state = {toggleTable: false, newPosition: false, tableRows: {}, tableHeaders: {}, newRow: {}};
    }

    componentDidMount = () => {
        ClientPositionTable.getRows(positionAdjusterTable => {
            this.setState({tableRows: positionAdjusterTable.positionAdjusterRows, tableHeaders: positionAdjusterTable.positionAdjusterTableColumnHeaders});    
            
        });       
    }

    toggleAddPositionTable = () => {       
        this.setState({toggleTable: !this.state.toggleTable, newPosition: false});
        
    }

    addNewPosition = (value) => {
        this.setState({newPosition: value});     
    }

    updatePositionAdjusterTable = (newRow) => {
        let tempTable = [...this.state.tableRows, newRow];
        let usdCash = tempTable[0];
        tempTable = tempTable.slice(1);
        tempTable.sort(function(a,b) {
            let secA = a.security.toLowerCase(), secB = b.security.toLowerCase();
            if(secA < secB) {
                return -1;
            } else if(secA > secB) {
                return 1;
            } else {
                return 0;
            }
        });        
        this.setState((prevState) => {
            return {tableRows:[usdCash, ...tempTable]};
        });   
    }    

    render = () => {
        return (
            <div>
            <div id="addPositionRibbonMenu">
                <div id="addPositionRibbonContainer">
                    <div id="ribbonMenuContainerSilver" onClick={(e) => this.toggleAddPositionTable(e) }>
                        <span id="addPositionHeader">
                            <img src={"/images/Collapse Down.png"} />
                            <span id="addPositionText">Add a new position</span>
                        </span>        
                    </div>
                </div>
            </div> 
            {this.state.toggleTable ? <AccountWorksheetAddPositionTable newRow={this.addNewPosition} updateTable = {this.updatePositionAdjusterTable}/> : null} 
            {this.state.tableRows.length ? (
                    <PositionAdjusterTable rows={this.state.tableRows} headers={this.state.tableHeaders} />
                ) : (
                    <div>No data to display</div>
                )
            }
            </div>  
            
        );
    }
}

class AccountWorksheetAddPositionTable extends Component {
    
    constructor(props) {
    super(props);
    this.state = {       
        newRow: {}
        };
    }

    onTypeChange(e) {
        var tempRow = {'positionType': e.target.value};
    }
    addNewPosition(e) {
        var tempRow = {
            security: this.refs.security.value,
            positionType: this.refs.tradeType.value === "Buy Long" ? "Long" : "Short",
            currentQty: "0.000",
            customTradeType: this.refs.tradeType.value,        
            tradeType: ["Buy Long", "Sell Short"],
            tradeQty: this.refs.tradeQty.value,
            tradeAmount: this.refs.tradeAmnt.value,
            expectedQty: "0.0000",
            expectedAmt: "0.00",
            expectedPercent: "0.000",
            customPercent: "0.000",
            driftPercent: "0.000",
            relativeDrift: "0.000",
            CUSIP: "020002101",
            description: this.refs.description.value,
            glAmt: "0.00",
            glPercent: "0.000",
            lastPrice: "43.020000",
            tradeReason: "Manual",
            moneyness: "",
            expiration: ""
            
        };
        this.props.newRow(true);
        var newState = Object.assign(this.state, {newRow: tempRow});
        this.setState(newState);
        this.props.updateTable(this.state.newRow);
    }

    render() {
        return (
            <div>
                <div id="addPositionTableContainer">
                    <table id="addPositionTable">
                        <thead>
                            <tr>
                                <th className="addPositionTable_Head">Type</th>
                                <th className="addPositionTable_Head" colSpan={2} id="secOptionsHeader">Security/CUSIP</th>
                                <th className="addPositionTable_Head">Description</th>
                                <th className="addPositionTable_Head">Sleeve</th>
                                <th className="addPositionTable_Head">Trade Type</th>
                                <th className="addPositionTable_Head">Trade Amount(Optional)</th>
                                <th className="addPositionTable_Head">Trade Quantity(Optional)</th>    
                            </tr>    
                        </thead>
                        <tbody>
                            <tr id="addPositionTable_mainBody">
                                <td className="addPositionTable_mainCell addPositionTable_width1">
                                    <select id="typeSelector" className="addPositionTable_Dropdown" ref="typeChange" onChange= {(e) => this.onTypeChange(e)} >
                                        <option>Security</option>
                                        <option>Options</option>
                                    </select>
                                </td>    
                                <td className="addPositionTable_mainCell addPositionTable_width2">
                                    <input type="text" id="securityInputText" ref="security" className="addPositionTable_InputField"/>
                                </td>
                                <td className="addPositionTable_width3">
                                    <img id="infoIcon" src={"/images/Symbol Information 3.png"} /> 
						            <img id="lookupIcon" src={"/images/Symbol Search.png"}/>
                                </td>
                                <td className="addPositionTable_mainCell addPositionTable_width2">
                                    <input type="text" id="descriptionText" ref="description" className="addPositionTable_InputField" readOnly />
                                </td>
                                <td className="addPositionTable_mainCell addPositionTable_width1">
                                    <select id="sleeveSelector" ref="sleeve" className="addPositionTable_Dropdown">
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </td>
                                <td className="addPositionTable_mainCell addPositionTable_width1">
                                    <select id="tradeTypeSelector" ref="tradeType" className="addPositionTable_Dropdown">
                                        <option>Buy Long</option>
                                        <option>Sell Short</option>
                                    </select>
                                </td>
                                <td className="addPositionTable_mainCell addPositionTable_width1">
						            <input type="text" id="tradeAmnt" ref="tradeAmnt" className="addPositionTable_InputField" defaultValue="" disabled/>
					            </td>
					            <td className="addPositionTable_mainCell addPositionTable_width1">
						            <input type="text" id="tradeQty" ref="tradeQty" defaultValue="" className="addPositionTable_InputField"/>
					            </td>                        
                            </tr>
                            <tr style={{height: 30}}>
					            <td colSpan={8}>
						            <input id="addPositionButton" type="button" value="Add" onClick={(e) => this.addNewPosition(e)}/>
					            </td>
				            </tr>    
                        </tbody>        
                    </table>    
                </div>
                
                     
            </div>    
        );
    }
}

class PositionAdjusterTable extends Component {
    
    _headers(headers) {
        let columns =Object.keys(headers).map(value => 
            <th>{headers[value]}</th>
        );    
        return(
            <tr>{columns}</tr>
        )
    }
    _loadDropdown(dropdownList) {
        console.log(dropdownList);
        let dropDownOption = Object.keys(dropdownList).map(key => 
            <option>{dropdownList[key]}</option>
        );
        return (<select>{dropDownOption}</select>);
    }

    _onChange(){

    }

    _rows(row, index){
        var self= this;       
        let singleRow = Object.keys(row).map(key => {
            if(key !== "customTradeType") {
                if((key === "tradeType") && (row['security'] !== "USD Cash")) {
                    return (<td>{self._loadDropdown(row[key])}</td>);
                } else if(key === "tradeQty"){
                    return (<td><input type="text" value={row[key]} onChange={this._onChange}/></td>);
                } else {
                        return ((<td>{row[key]}</td>));
                }
           } else {

           }
           
           //key === "tradeType" && row['security'] !== "USD Cash"? (<td>{self._loadDropdown(row[key])}</td>) : (<td>{row[key]}</td>)
        });
        console.log(singleRow);
        return(<tr key={index}>{singleRow}</tr>);
       // console.log("row " + JSON.stringify(row));
    }

    render () {
        //var data = positionAdjusterData.positionAdjusterRows;
        var self = this,
            data = this.props.rows,
            headers = this.props.headers;

        return (
            <table id="positionAdjusterGrid">
                <thead id="positionAdjusterTableHeader">
                    {
                        this._headers(headers)
                    }
                </thead>
                <tbody>
                   {
                        Object.keys(data).map((row, index) => 
                            this._rows(data[row], index)   
                                            
                       )
                   }
                </tbody>        
            </table>
        );
    }
}

class PositionAdjusterTableRows extends Component {
    render() {
        return (<td></td>);
    }
}

export default AccountWorksheetToolbar;
