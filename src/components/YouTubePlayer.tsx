import * as React from "react";
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export type PlayerProps = {
  video: string;
  speed: number;
  mirror: boolean;
  fromWatch: boolean;
  onReady: () => void;
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

  componentWillReceiveProps(nextProps: PlayerProps): void {
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
      youtube.playVideo();
    }
  }

  initPlayer(e: Event): void {
    youtube = e.target;
    this.props.onReady();
  }

  setPlayBackRate(rate: number): void {
    youtube.setPlaybackRate(rate);
  }

  setMirror(mirror: boolean): void {
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
      <div>
        <div className="general-prompt" hidden={this.state.vidId !== ''}>
          {!this.props.fromWatch ?
            <div>
              <h1>YouTube Mirrorify</h1>
              <h2>Play Video by pasting the link in the box below</h2>
              <div className="mb-30">Built with <div className="beating-heart">❤</div> by <a href="https://yonglinwang.ca">Yong Lin Wang</a>, for those who dance.</div>
              <button className="btn btn-primary"><FontAwesomeIcon icon={faGithub} /> GitHub Repo</button>
            </div> : 
            <div>
              <p>Loading Your Video Now...</p>
            </div>
          }
        </div>
        <div className={(this.state.mirror ? 'player-container mirrored' : 'player-container')} hidden={this.state.vidId === ''}>
          <YouTube className="video-player" videoId={this.state.vidId} onReady={this.initPlayer} opts={{playerVars: {fs: 0, autoplay: 1}}} />
        </div>
      </div>
    );
  }
}