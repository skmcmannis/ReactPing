import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Ping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadSpeeds: [],
      ping: 0,
      pingTimer: 0,
    }
  }

  getPing() {
    return (Math.random() * 100).toFixed(2);
  }

  updatePing() {
    let downloadSpeeds;
    if (this.state.downloadSpeeds.length > 9) {
      downloadSpeeds = this.state.downloadSpeeds.slice(1, 10);
    } else {
      downloadSpeeds = this.state.downloadSpeeds.slice(0, 9);
    }
    this.ping = this.getPing();

    this.setState({
      downloadSpeeds: downloadSpeeds.concat(this.ping),
    });
  }

  componentDidMount() {
    this.updatePing(this.state);

    this.pingTimer = setInterval(() => {this.updatePing()}, 10000);
  }

  render() {
    const downloadSpeeds = this.state.downloadSpeeds;
    
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Current download speed: {downloadSpeeds[downloadSpeeds.length - 1]} mb/s.
          </p>
        </header>
      </div>
    ); 
  }
}

ReactDOM.render (
  <Ping />,
  document.getElementById('root')
);

export default Ping;