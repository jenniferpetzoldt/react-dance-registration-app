import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
});

class ClassNameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newForm: { 
            month: '',
            year: '',
            levelOne: '',
            levelFour: '',
            soloJazz: '',
            levelTwo: '',
            levelThree: '',
            levelFive: '',}
        }
    }

    handleChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                [event.target.name]: event.target.value,
            }
        })
    }

    addNewForm = event => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_FORM', payload: this.state.newForm});
        axios({
            method: 'POST',
            url: '/api/form',
            data: {newForm: this.state.newForm}
        }).then((response) =>{
            console.log('Success with form POST');
        }).catch((error)=>{
            console.log('Post error', error);
            alert('Unable to add form');
        })
    }

    render() {
        return (
            <form onSubmit={this.addNewForm}>
                <div>
                    <label>Month</label>
                    <input name="month" onChange={this.handleChange} />
                    <label>Year</label>
                    <input name="year" onChange={this.handleChange} />
                    Tuesdays
                </div>
                <h2>Lessons</h2>
                <div>
                    <h3>07:00pm</h3>
                    <label>Level 1</label>
                    <input name="levelOne" onChange={this.handleChange} />
                    <label>Level 4</label>
                    <input name="levelFour" onChange={this.handleChange} />
                    <label>Solo Jazz</label>
                    <input name="soloJazz" onChange={this.handleChange} />
                    <h3>08:30pm</h3>
                    <label>Level 2</label>
                    <input name="levelTwo" onChange={this.handleChange}  />
                    <label>Level 3</label>
                    <input name="levelThree" onChange={this.handleChange}  />
                    <label>Level 5</label>
                    <input name="levelFive" onChange={this.handleChange}  />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps)(ClassNameInput);