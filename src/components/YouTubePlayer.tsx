import * as React from "react";

declare global {
  interface Window { 
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

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
  youtube: any;
  mirrorText: string;
}

export class YouTubePlayer extends React.Component<PlayerProps, PlayerState> {
  state: PlayerState = {
    vidId: '',
    mirror: false,
    mirrorText: '',
    speed: 1,
    start: 0,
    end: 0,
    youtube: null,
  }

  constructor (props: PlayerProps) {
    super(props);
    this.initPlayer();
  }

  componentDidMount() {
    this.setState({
      vidId: this.props.video
    });
    window['onYouTubeIframeAPIReady'] = () => {
      const player = new window['YT'].Player('player', {
        videoId: this.state.vidId,
        height: '360',
        width: '640',
      });
      this.setState({
        youtube: player
      });
    }
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
  }

  initPlayer() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  setPlayBackRate(rate: number) {
    this.state.youtube.setPlaybackRate(rate);
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
      <div className={this.state.mirror ? 'mirrored' : null}>
        <div className={`video-player ${this.state.mirrorText}`} id="player"></div>
      </div>
    );
  }
}