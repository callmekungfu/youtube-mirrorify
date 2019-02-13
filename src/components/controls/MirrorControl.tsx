import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

export type SpeedControlProps = {
  handleMirrorChange: (speed: boolean) => void;
  mirrored?: boolean;
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

  componentDidUpdate() {
    if (this.props.mirrored != this.state.mirrored) {
      this.setState({
        mirrored: this.props.mirrored
      })
    }
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
      <button className="btn mirror-btn" onClick={this.handleClick}><FontAwesomeIcon icon={faExchangeAlt} /> {(this.state.mirrored) ? 'Normal Video' : 'Mirror Video'}</button>
    )
  }
}
