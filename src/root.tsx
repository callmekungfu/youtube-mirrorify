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
}

export class Root extends React.Component<props, state> {
  state: state = {
    speed: 1,
    mirror: false,
    target: '',
    fromWatch: false,
    playerReady: false,
  }

  constructor(props: any) {
    super(props);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleMirrorChange = this.handleMirrorChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
  }

  componentDidMount() {
    const fromWatch = this.props.match.path.indexOf('watch') !== -1;
    this.setState({
      fromWatch
    });
  }

  componentDidUpdate() {
    if (this.state.playerReady && this.props.location.search && this.state.target === '') {
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

  render() {
    return (
      <div>
        <YouTubePlayer fromWatch={this.state.fromWatch} video={this.state.target} speed={this.state.speed} mirror={this.state.mirror} onReady={this.handlePlayerReady} />
        <Controls handleSpeedChange={this.handleSpeedChange} handleMirrorChange={this.handleMirrorChange} handleTargetChange={this.handleTargetChange} />
      </div>
    )
  }

  // Author: Lasnv https://stackoverflow.com/users/1064371/lasnv, Modified for typescript
  youtubeParser(url: string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[7].length == 11) {
      return match[7];
    } else {
      throw new Error('Not a YouTube Link or ID.')
    }
  }
}