import React from 'react';
import ReactDOM from 'react-dom';

class ClockClass extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
    return (<div>
      <h1>
        Hora : {
          this.props.date.toLocaleTimeString()
        }
      </h1>
    </div>)
  }
}



function tick(){
  ReactDOM.render(
    <ClockClass date ={new Date()}/>,
    document.getElementById('root')
  );

}

setInterval(tick, 1000)



