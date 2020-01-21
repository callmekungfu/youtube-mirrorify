import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { SpeedControl } from './controls/SpeedControl';
import { MirrorControl } from './controls/MirrorControl';
import { TargetControl } from './controls/TargetControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExpand, faCompress, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { LoopControl } from './controls/LoopControl';

export type ControlProps = {
  handleSpeedChange: (speed: number) => void;
  handleMirrorChange: (mirror: boolean) => void;
  handleTargetChange: (target: string) => void;
  handleStartTimeChange: (time: number) => void;
  handleEndTimeChange: (time: number) => void;
  mirrored?: boolean;
};

type ControlState = {
  closed: boolean;
  fullscreen: boolean;
};

export class Controls extends React.Component<ControlProps, ControlState> {
  state: ControlState = {
    closed: false,
    fullscreen: false,
  }

  constructor(props: ControlProps) {
    super(props);

    this.handleCloseAction = this.handleCloseAction.bind(this);
    this.handleFullscreenToggle = this.handleFullscreenToggle.bind(this);

    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleMirrorChange = this.handleMirrorChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  handleCloseAction () {
    this.setState({
      closed: !this.state.closed
    });
  }

  handleFullscreenToggle () {
    const elem: any = document.documentElement;
    const doc: any = document;

    this.setState({
      fullscreen: !this.state.fullscreen
    })

    const { fullscreen } = this.state;

    if (!fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { /* Firefox */
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { /* IE/Edge */
        doc.msExitFullscreen();
      }
    }
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
    <div className="controls-master">
      <div className="persistent-controls">
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {this.state.closed ? <button className="btn btn-primary btn-round fullscreen" onClick={this.handleCloseAction } ><FontAwesomeIcon icon={faArrowUp} /></button> : null}
        </ReactCSSTransitionGroup>
        <button className="btn btn-secondary btn-round fullscreen" onClick={this.handleFullscreenToggle }><FontAwesomeIcon icon={this.state.fullscreen ? faCompress : faExpand} /></button>
      </div>
      <ReactCSSTransitionGroup transitionName="slide" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
        {!this.state.closed ? 
          <div className="controls-container">
            <div className="hide-controls" onClick={this.handleCloseAction}><FontAwesomeIcon icon={faTimes} /></div>
            <div>
              <h4>Player Utilities</h4>
              <SpeedControl speedChange={this.handleSpeedChange}/>
              <MirrorControl handleMirrorChange={this.handleMirrorChange} mirrored={this.props.mirrored}/>
            </div>
            <div>
              <h4>Loop Video</h4>
              <LoopControl handleStartTimeChange={this.props.handleStartTimeChange} handleEndTimeChange={this.props.handleEndTimeChange} />
            </div>
            <div>
              <h4>Play Video</h4>
              <TargetControl handleTargetChange={this.handleTargetChange}/>
            </div>
          </div>
        : null}
      </ReactCSSTransitionGroup>
    </div>
    )
  }
};