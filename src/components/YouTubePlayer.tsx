import * as React from "react";

declare global {
  interface Window { 
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

window.YT = window.YT || {};

export interface PlayerProps {
  video: string;
}

interface PlayerState {
  vidId: string;
  mirrored: boolean;
  speed: string;
  start: number;
  end: number;
  youtube: object;
}

export class YouTubePlayer extends React.Component<PlayerProps, PlayerState> {
  state: PlayerState = {
    vidId: '',
    mirrored: false,
    speed: '1',
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

  initPlayer() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  render() {
    return (
    <div>
      <div className="video-player" id="player"></div>
    </div>
    );
  }
}