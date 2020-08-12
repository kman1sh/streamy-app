import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Modal from "../Modal";
import history from "../../history";
import { fetchStream } from "../../actions";
import { deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDeleteAction = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderActions() {
    return (
      <React.Fragment>
        <button
          className="ui primary button negative"
          onClick={this.onDeleteAction}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderStreamInfo() {
    if (this.props.stream) {
      return `Are you sure do you want to delete the stream with title: ${this.props.stream.title}`;
    }

    return "Are you sure do you want to delete this stream?";
  }

  render() {
    console.log(this.props.stream);

    return (
      <div>
        <Modal
          header="Delete Stream"
          content={this.renderStreamInfo()}
          onClick={() => history.push("/")}
          actions={this.renderActions()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
