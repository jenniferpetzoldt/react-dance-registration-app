import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';



const mapStateToProps = state => ({
});

class CreateFormPage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div>
                    <label>Month</label>
                    <input />
                    <label>Year</label>
                    <input />
                    Tuesdays
                </div>
                <h2>Lessons</h2>
                <div>
                    <h3>07:00pm</h3>
                    <label>Level 1</label>
                    <input onChange={this.handleLevelOneChange} />
                    <label>Level 4</label>
                    <input onChange={this.handleLevelFourChange} />
                    <label>Solo Jazz</label>
                    <input onChange={this.handleSoloJazzChange} />
                    <h3>08:30pm</h3>
                    <label>Level 2</label>
                    <input onChange={this.handleLevelTwoChange} />
                    <label>Level 3</label>
                    <input onChange={this.handleLevelThreeChange} />
                    <label>Level 5</label>
                    <input onChange={this.handleLevelFiveChange} />
                    <button>Create Form</button>
                </div>

                <button>Create Form</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateFormPage);