import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoList extends Component {
  render() {
    var self = this;
    return (
      
      <ul className="listItem">
        {this.props.items.map(item => (
         
          <li key={item.id}><span>{item.text}</span><button onClick={(e) => self.props.delete(e,item.text, item.id)}>Delete</button></li>
          
        
        ))}
      </ul>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {items: [], text: ''};
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} delete={this.handleDelete}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("state" + this.state.text);
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
    console.log("items " +JSON.stringify(this.state.items));
  }

  handleDelete(e, item, id) {
    e.preventDefault();
    //console.log("in delete"+ JSON.stringify(this.state.items));
    //console.log("prev state " +item+","+id);
   var newArray =  this.state.items.filter(function(data){
      return data.id !== id;
    });
   console.log("Array " + JSON.stringify(newArray));
   this.setState({"items":newArray});
  }
}



export default App;
