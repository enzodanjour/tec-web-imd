import React from 'react';
import ReactDOM from 'react-dom';





ReactDOM.render(
  <ButaoClass/>,
  document.getElementById('root')
);

class ButaoClass extends React.component{
  
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
  }
  changeValue(){
    this.setState({value: value++});
  }

  clearValue(){
    this.setState({value: 0});
  }
  
  render(){
    return <div>
    <h1>
      Quantidade de cliques: {value}
    </h1>
    <Button Name="Adicionar" onclick="changeValue"/>
    <Button name="limpar" onclick="clearValue"/>
  </div>
  }
}