import * as React from "react";
import * as ReactDOM from "react-dom";

import { YouTubePlayer } from './components/YouTubePlayer';

import './styles/main.css';

ReactDOM.render(
  <YouTubePlayer video="OiTCDijrze8" />,
  document.getElementById('example')
);