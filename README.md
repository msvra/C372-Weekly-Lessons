# C372 Payment Technologies — Weekly Lessons

This repository contains my weekly practical exercises and application development work for the C372 Payment Technologies module at Republic Polytechnic.

The exercises focus on web application development, the Model-View-Controller (MVC) architecture, specification-driven development, and Payment API integration.

## Repository Structure

### Week 1 — Introduction to Web Application Development

- **HelloApp:** Introductory Node.js application.
- **PetCareApp:** Pet Care application development exercises.
- **Revision:** JavaScript revision exercises.

### Week 2 — MVC Architecture

Refactored the PetCareApp into the Model-View-Controller (MVC) architecture.

Key learning areas:
- Separating application logic into Models, Views and Controllers.
- Organising Express routes and controllers.
- Maintaining application functionality after refactoring.

### Week 3 — Payment API Development

**Lesson 5: Specification-Driven Development**
- Understanding API specifications.
- Implementing GET Payment API endpoints.
- Testing API responses using Postman.

**Lesson 6: Payment API with Postman**
- Implementing POST Payment API endpoints.
- Integrating a mock payment provider.
- Testing different payment scenarios using Postman.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- MySQL
- EJS
- Postman
- Git and GitHub
- Visual Studio Code

## Running the Applications

1. Navigate to the relevant application folder.
2. Install the project dependencies using `npm install`.
3. Configure the required MySQL database.
4. Create a `.env` file with the appropriate database credentials for applications using environment variables.
5. Start the application using `node app.js`.
6. Access the application at `http://localhost:3000`.

## Security

Database credentials and other sensitive information are stored in environment variables where applicable. The `.gitignore` file prevents local `.env` files and `node_modules` directories from being uploaded to GitHub.

## Purpose

This repository documents my learning progress and completed practical exercises throughout the C372 Payment Technologies module.