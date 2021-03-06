import * as React from "react";

import { YouTubePlayer } from './components/YouTubePlayer';
import { Controls } from "./components/PlayerControls";

type props = {
  location?: {
    hash: string;
    pathname: string;
    search: string;
  },
  match: {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
  }
}

type state = {
  speed: number;
  mirror: boolean;
  target: string;
  fromWatch: boolean;
  playerReady: boolean;
  loop: boolean;
  startTime: number;
  endTime: number;
}

export class Root extends React.Component<props, state> {
  state: state = {
    speed: 1,
    mirror: false,
    target: '',
    fromWatch: false,
    playerReady: false,
    loop: false,
    startTime: 0,
    endTime: -1
  }

  constructor(props: props) {
    super(props);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleMirrorChange = this.handleMirrorChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
  }

  componentDidMount() {
    const fromWatch = this.props.match.path.indexOf('watch') !== -1;
    this.setState({
      fromWatch,
      mirror: fromWatch
    });
  }

  componentDidUpdate() {
    if (this.state.playerReady && this.props.location && this.props.location.search && this.state.target === '') {
      const target = this.props.location.search.substr(this.props.location.search.indexOf('?v=') + 3, + 11);
      this.setState({
        target
      });
    }
  }

  handlePlayerReady() {
    this.setState({
      playerReady: true
    })
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

  handleStartTimeChange(startTime: number) {
    this.setState({
      startTime
    })
  }

  handleEndTimeChange(endTime: number) {
    this.setState({
      endTime
    })
  }

  render() {
    return (
      <div>
        <YouTubePlayer fromWatch={this.state.fromWatch} video={this.state.target} speed={this.state.speed} mirror={this.state.mirror} onReady={this.handlePlayerReady} />
        <Controls handleSpeedChange={this.handleSpeedChange} handleMirrorChange={this.handleMirrorChange} handleTargetChange={this.handleTargetChange} mirrored={this.state.mirror} handleStartTimeChange={this.handleStartTimeChange} handleEndTimeChange={this.handleEndTimeChange} />
      </div>
    )
  }

  // Author: Lasnv https://stackoverflow.com/users/1064371/lasnv, Modified for typescript
  youtubeParser(url: string) {
    // eslint-disable-next-line no-useless-escape
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[7].length === 11) {
      return match[7];
    } else {
      throw new Error('Not a YouTube Link or ID.')
    }
  }
}