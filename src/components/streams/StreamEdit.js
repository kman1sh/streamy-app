import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  componentDidMount() {
    // NOTE: With React-Router, each component needs to be desgined to work in isolation(fetch its own data!).
    // REASON: when user will visit Edit page from Stream List page, and since Stream list page load first, it will maintain
    // streams reducer and hence on edit page we can call specific stream detail from reducer. but what if user directly open edit page(from bookmarked may be)
    // without opening Stream list page, in that case there will be no data in reducer to fetch from to edit. hence we will get error/undefined.
    // hence instead of depending on other component and faith rkhna ki other component ne toh data fetch kr hi liya hoga is bad practice.
    // each component dependently work krna hai hence, required data khud fetch krna hai.
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    console.log(this.props.stream);
    if (!this.props.stream) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        {this.props.stream.title}
        <br />
        {this.props.stream.description}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
