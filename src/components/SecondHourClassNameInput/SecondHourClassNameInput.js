import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class SecondHourClassNameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelTwo: '',
            levelThree: '',
            levelFive: '',
        }
    }

    handleLevelTwoChange = (event) => {
        this.setState({
            levelTwo: event.target.value,
        });
    }

    handleLevelThreeChange = (event) => {
        this.setState({
            levelThree: event.target.value,
        })
    }

    handleLevelFiveChange = (event) => {
        this.setState({
            levelFive: event.target.value,
        })
        console.log('state equals', this.state);
    }

    handleLevel

    render() {
        return (
            <div>
                <h3>08:30pm</h3>
                <label>Level 2</label>
                <input onChange={this.handleLevelTwoChange}/>
                <label>Level 3</label>
                <input onChange={this.handleLevelThreeChange}/>
                <label>Level 5</label>
                <input onChange={this.handleLevelFiveChange}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SecondHourClassNameInput);