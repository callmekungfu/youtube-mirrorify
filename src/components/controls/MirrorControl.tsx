import * as React from 'react';

export type SpeedControlProps = {
  handleMirrorChange: (speed: boolean) => void;
};

type SpeedControlState = {
  mirrored: boolean;
}

export class MirrorControl extends React.Component<SpeedControlProps, SpeedControlState> {
  state: SpeedControlState = {
    mirrored: false 
  }

  constructor (props: SpeedControlProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    const mirrored = !this.state.mirrored;
    this.props.handleMirrorChange(mirrored);
    this.setState({
      mirrored
    })
  }

  render() {
    return (
      <button onClick={this.handleClick}>{(this.state.mirrored) ? 'Go Back to Normal' : 'Mirror Video'}</button>
    )
  }
}
