import * as React from 'react';

type loopControlProps = {
  handleStartTimeChange: (time: number) => void;
  handleEndTimeChange: (time: number) => void;
  startTime?: number;
  endTime?: number;
};

type loopControlState = {
  startTime: number;
  endTime: number;
  bad_input: boolean;
};

export class LoopControl extends React.Component<
  loopControlProps,
  loopControlState
> {
  state: loopControlState = {
    startTime: 0,
    endTime: -1,
    bad_input: false
  };

  handleStartTimeChange(e: any) {
    console.log(e.target.value);
  }

  handleEndTimeChange(e: any) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className={this.state.bad_input ? 'error' : ''}>
        <p className="error-prompt" hidden={!this.state.bad_input}>
          Your Loop timer has problem.
        </p>
        <div className="loop-control-container">
          <h5>From</h5>
          <input
            type="number"
            placeholder="Start"
            className="time-input"
            defaultValue={`${this.state.startTime}`}
            onChange={this.handleStartTimeChange}
          />
          <h5>To</h5>
          <input
            type="number"
            placeholder="End"
            className="time-input"
            defaultValue={`${this.state.endTime}`}
            onChange={this.handleEndTimeChange}
          />
          <div>
            <input type="checkbox" id="switch" /> <label>Toggle</label>
          </div>
        </div>
      </div>
    );
  }
}
