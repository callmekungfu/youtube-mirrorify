import * as React from 'react';
import { SpeedControl } from './controls/SpeedControl';
import { MirrorControl } from './controls/MirrorControl';
import { TargetControl } from './controls/TargetControl';

export type ControlProps = {
  handleSpeedChange: (speed: number) => void;
  handleMirrorChange: (mirror: boolean) => void;
  handleTargetChange: (target: string) => void;
};

interface ControlState {

};

export class Controls extends React.Component<ControlProps, ControlState> {
  constructor(props: ControlProps) {
    super(props);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleMirrorChange = this.handleMirrorChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  handleSpeedChange (speed: number) {
    this.props.handleSpeedChange(speed);
  }

  handleMirrorChange (mirror: boolean) {
    this.props.handleMirrorChange(mirror);
  }

  handleTargetChange (target: string) {
    this.props.handleTargetChange(target);
  }

  render() {
    return (
    <div className="controls-container">
      <SpeedControl speedChange={this.handleSpeedChange}/>
      <MirrorControl handleMirrorChange={this.handleMirrorChange}/>
      <TargetControl handleTargetChange={this.handleTargetChange}/>
    </div>
    )
  }
};