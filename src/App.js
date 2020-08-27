import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Ping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadSpeeds: [],
      history: {
        speed: [],
        time: [],
      },
      currTime: 0,
      ping: 0,
      pingTimer: 0,
    }
  }

  getPing() {
    return (Math.random() * 100).toFixed(2);
  }

  getTime() {
    const currDate = new Date(Date.now());
    const hour = currDate.getHours();
    let minutes = currDate.getMinutes();
    minutes = minutes.toString();
    if (minutes.length === 1) {minutes = minutes.padStart(2, '0');}

    let seconds = currDate.getSeconds();
    seconds = seconds.toString();
    if (seconds.length === 1) {seconds = seconds.padStart(2, '0');}

    return `${hour}:${minutes}:${seconds}`;
  }

  updatePing() {
    let downloadSpeeds;
    let times;

    if (this.state.downloadSpeeds.length > 9) {
      downloadSpeeds = this.state.downloadSpeeds.slice(1, 10);
    } else {
      downloadSpeeds = this.state.downloadSpeeds.slice(0, 9);
    }

    this.ping = this.getPing();
    downloadSpeeds = downloadSpeeds.concat(this.ping);

    if (this.state.history.time && this.state.history.time.length > 8) {
      times = this.state.history.time.slice(1, 9);
    } else {
      times = this.state.history.time.slice(0, 8);
    }

    this.currTime = this.getTime();
    times = times.concat(this.currTime);

    const speedHistory = {
      speed: downloadSpeeds.slice(0, downloadSpeeds.length),
      time: times.slice(0, times.length),
    }

    this.setState({
      downloadSpeeds: downloadSpeeds,
      history: speedHistory,
    });
  }

  componentDidMount() {
    this.updatePing(this.state);

    this.pingTimer = setInterval(() => {this.updatePing()}, 10000);
  }

  render() {
    const downloadSpeeds = this.state.downloadSpeeds;
    const history = this.state.history;
    let historyEntries = [];
    for (let i = 0; i < history.speed.length - 1; i++) {
      historyEntries.push(`Download speed at ${history.time[i]}: ${history.speed[i]}`)
    }

    historyEntries = historyEntries.reverse();
    
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Current download speed: {downloadSpeeds[downloadSpeeds.length - 1]} mb/s.
          </p>
        </header>
        <div className="History">
          {historyEntries.map((entry, index) => 
            <li key={index}>{entry}</li>
          )}
        </div>
      </div>
    ); 
  }
}

ReactDOM.render (
  <Ping />,
  document.getElementById('root')
);

export default Ping;