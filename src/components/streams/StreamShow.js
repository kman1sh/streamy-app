import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
//flv.js helps to download a stream and convert it into some format so that we a can stream it on our video player.
// so it is about setting video and NOT SETTING UP VIDEO PLAYER.
import flv from "flv.js";

class StreamShow extends React.Component {
  //creating <video> ref inside constructor
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  // Called immediately after updating occurs (fetching Stream cause this component to update and rerender). Not called for the initial render.
  componentDidUpdate() {
    this.buildPlayer();
  }

  /**
   * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as cancelled network
   *  requests, or cleaning up any DOM elements created in componentDidMount
   * So this is good place to clear player and stop streaming once we move away from StreamShow Component
   */
  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  //helper Method
  buildPlayer() {
    // we are not going to build player IF player is already built OR this.props.stream is undefined yet.
    if (this.flvPlayer || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    // this.flvPlayer se flvPlayer var ka scope all over the class the but const flvPlayer se var ka scope sirf code block ka hi hai.
    this.flvPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      /**
       * we need reference of <video> element to refer this tag above becoz  we want to attach flv config setting with this <video> tag.
       */
      <div className="item">
        <video ref={this.videoRef} style={{ width: "75%" }} controls />
        <div className="content">
          <h3>{title}</h3>
        </div>
        <div className="description">{description}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
