# attenDANCE
An attendance tracking app for dance instructors. Administrators are able to log in and input classnames for upcoming month sessions, as well as track attendance for sessions. Students are able to log in and register for upcoming sessions.

![Attendance Table](/public/images/attendance_table.png?raw=true "Attendance Table")
![Create Form View](/public/images/create_form.png?raw=true "Create Form view")
![Personal Information](/public/images/personal_information.png?raw=true "Personal Information")

## Built With
* React
* Redux
* Express
* Node.js
* MaterialUI
* postgreSQL
* HTML
* CSS

## Getting Started
These instructions will create a copy of the project for you to utilize on your local machine for development and testing purposes. See deployment notes on how to deploy the project on a live system.

### Installing
Steps to get the develoment environment running.

1. Fork and Clone this project to your computer.
2. ```npm install```
3. Set up a database in postico
4. ```npm run server```
5. ```npm run client```
6. Open within your code editing tool.

### Completed Features
Administrator:
- [X] Create Form view takes in the month, year, and class names for the session
- [X] Create Form view has a table of created sessions.
    - [X] Deleting session from table removes session from database
- [X] Attendance view populates a table with the registrations associated to the selected session
- [X] Attendance view allows administrators to track attendance and payments through dialogs that update the registration in the database
- [X] Registrations can be deleted from the attendance table and database
- [X] Add dancer button toggles a form to add a registration to the form
- [X] Add dancer form closes when close form button is pressed
Student:
- [X] Students are able to select a session to register for classes
- [X] Students are prompted through a form
- [X] Confirmation dialog allows them to review their information and submit the registration
- [X] From the confirmation Students are able to edit their information prior to submitting the registration
- [X] Students are redirected to a success message after submitting
- [X] Button on success page brings them back to the main registration page
- [X] Styled with Material-UI

### Next Steps
Features to be added:
- [ ] Incorperate Paypal as a payment option
- [ ] Incorperate AWS to host data in the cloud
- [ ] Build in inline editing for the attendance table

## Authors
* Jennifer Petzoldt