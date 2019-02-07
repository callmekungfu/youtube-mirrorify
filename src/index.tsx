import * as React from "react";
import * as ReactDOM from "react-dom";

import { YouTubePlayer } from './components/YouTubePlayer';

import './styles/main.css';
import { Controls } from "./components/PlayerControls";

type state = {
  speed: number;
  mirror: boolean;
  target: string;
}

class Root extends React.Component {
  state: state = {
    speed: 1,
    mirror: false,
    target: ''
  }

  constructor(props: any) {
    super(props);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleMirrorChange = this.handleMirrorChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  handleSpeedChange(speed: number) {
    this.setState({
      speed
    });
  }

  handleMirrorChange(mirror: boolean) {
    this.setState({
      mirror
    });
  }

  handleTargetChange(target: string) {
    this.setState({
      target
    })
  }

  render() {
    return (
      <div>
        <YouTubePlayer video={this.state.target} speed={this.state.speed} mirror={this.state.mirror}/>
        <Controls handleSpeedChange={this.handleSpeedChange} handleMirrorChange={this.handleMirrorChange} handleTargetChange={this.handleTargetChange}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('example')
);