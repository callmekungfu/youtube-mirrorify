import * as React from 'react';

export type TargetControlProps = {
  handleTargetChange: (target: string) => void;
};

type TargetControlState = {
  target: string;
}

export class TargetControl extends React.Component<TargetControlProps, TargetControlState> {
  state: TargetControlState = {
    target: ''
  }

  constructor (props: TargetControlProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e: any) {
    this.setState({
      target: e.target.value
    });
  }

  handleClick() {
    const id = this.youtubeParser(this.state.target);
    this.props.handleTargetChange(id);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Paste YouTube Link Here" onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Find Video</button>
      </div>
    )
  }

  // Author: Lasnv https://stackoverflow.com/users/1064371/lasnv, Modified for typescript
  youtubeParser(url: string){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : '';
  }
}
