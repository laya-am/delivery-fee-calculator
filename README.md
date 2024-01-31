

#  Delivery Fee Calculator 

This is a delivery fee calculator: an application used when a customer is ready with their shopping cart and they want to see how much the delivery will cost. The delivery price depends on the user input of cart value, the number of items in the cart, the time of the order, and the delivery distance.


## Installation and Setup Instructions


Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm run dev`  

To Visit App:

`localhost:5173`  

## About the Project
  

This app is developed using `Vite`, `React`, and `typescript`. All the components are tested by `jest` and `react-testing-library`. For styling `chakra-ui` is used. 

The form has complete validation in every input field, in order to avoid redundant requests to the backend and also bad user experience.
This means when the input value is invalid, the form gives clear feedback to the user and prevents the form from submition by disabling the button. For this purpose `chakra ui` was used.
 
The app is fully responsive and accessible. 
It's alse accessible by keyboard.
The accessibility of the app was checked using this article by Karl Groves: [6 Quick tests you can do to test your forms for accessibility](https://karlgroves.com/6-quick-tests-you-can-do-to-test-your-forms-for-accessibility/)

In order to make the code readable, `prettier` library is used to keep all the code clean and correctly formatted.

## Project Structure

In order to keep the code maintainable a clear structure is followed:

Inside src directory:

There are five components: one `Form` and four input fields.

There is also the `calculateFee` function inside `services` that calculates the delivery fee.

All these come together in `App.tsx` Where a heading, the form, and the fee are displayed all together.

All the mentioned filed are fully tested using `jest` and `react-testing-library`. Some additional libraries are also used to make the tests compatible with `typescript`.

## Project Screen Shots


![screenshot1](/public/Screenshot1.png "screenshot 1")
![screenshot2](/public/Screenshot2.png "screenshot 2")




