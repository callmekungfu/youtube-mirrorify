import * as React from "react";
import YouTube from 'react-youtube';

export type PlayerProps = {
  video: string;
  speed: number;
  mirror: boolean;
}

type PlayerState = {
  vidId: string;
  mirror: boolean;
  speed: number;
  start: number;
  end: number;
  mirrorText: string;
}

let youtube: any = null;

export class YouTubePlayer extends React.Component<PlayerProps, PlayerState> {
  state: PlayerState = {
    vidId: '',
    mirror: false,
    mirrorText: '',
    speed: 1,
    start: 0,
    end: 0,
  }

  constructor (props: PlayerProps) {
    super(props);
    this.initPlayer = this.initPlayer.bind(this);
  }

  componentWillReceiveProps(nextProps: PlayerProps) {
    if (nextProps.speed !== this.state.speed) {
      this.setState({ speed: nextProps.speed });
      this.setPlayBackRate(nextProps.speed);
    }
    if (nextProps.mirror !== this.state.mirror) {
      this.setState({ mirror: nextProps.mirror});
      this.setMirror(nextProps.mirror);
    }

    if (nextProps.video !== this.state.vidId) {
      this.setState({vidId: nextProps.video});
    }
  }

  initPlayer(e: any) {
    youtube = e.target;
    console.log(youtube.getAvailablePlaybackRates());
  }

  setPlayBackRate(rate: number) {
    youtube.setPlaybackRate(rate);
  }

  setMirror(mirror: boolean) {
    if(mirror) {
      this.setState({
        mirrorText: 'mirrored'
      })
    } else {
      this.setState({
        mirrorText: ''
      })
    }
  }

  render() {
    return (
      <div className={this.state.mirror ? 'player-container mirrored' : 'player-container'}>
        <YouTube className="video-player" videoId={this.state.vidId} onReady={this.initPlayer} />
      </div>
    );
  }
}