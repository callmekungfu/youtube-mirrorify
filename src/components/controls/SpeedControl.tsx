import * as React from 'react';

export type SpeedControlProps = {
  speedChange: (speed: number) => void;
};

type SpeedControlState = {
  speed: number;
}

export class SpeedControl extends React.Component<SpeedControlProps, SpeedControlState> {
  state: SpeedControlState = {
    speed: 1
  }

  constructor (props: SpeedControlProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    const speed = parseFloat(e.target.value);
    this.props.speedChange(speed);
    this.setState({
      speed
    })
  }

  render() {
    return (
      <select onChange={this.handleChange} value={this.state.speed}>
        <option value="2">2</option>
        <option value="1.75">1.75</option>
        <option value="1.5">1.5</option>
        <option value="1.25">1.25</option>
        <option value="1">Normal</option>
      </select>
    )
  }
}
