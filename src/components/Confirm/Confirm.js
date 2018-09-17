import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  });

class Confirm extends Component {
    render() {
        return (
            <div>
            <button>Confirm</button>
          </div>
        )
    }
}

export default connect(mapStateToProps)(Confirm);