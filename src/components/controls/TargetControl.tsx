import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export type TargetControlProps = {
  handleTargetChange: (target: string) => void;
};

type TargetControlState = {
  target: string;
  bad_input: boolean;
}

export class TargetControl extends React.Component<TargetControlProps, TargetControlState> {
  state: TargetControlState = {
    target: '',
    bad_input: false
  }

  constructor(props: TargetControlProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e: any) {
    this.setState({
      target: e.target.value,
      bad_input: false
    });
  }

  handleClick() {
    try {
      const id = this.youtubeParser(this.state.target);
      this.props.handleTargetChange(id);
    } catch (e) {
      this.setState({
        bad_input: true
      })
    }
  }

  render() {
    return (
      <div className={this.state.bad_input ? 'error' : ''}>
        <p className="error-prompt" hidden={!this.state.bad_input}>This is not a valid YouTube link.</p>
        <input type="text" className="link-input" placeholder="Paste YouTube Link Here" onChange={this.handleChange} />
        <button className="btn search-btn" onClick={this.handleClick}><FontAwesomeIcon icon={faArrowRight} /></button>
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
