# Pet Profile Management API

## Overview

The Pet Profile Management API is a robust Node.js application built with TypeScript that facilitates the management of pet profiles using QR codes. It is designed to streamline the process of creating, updating, and retrieving information about pets and their owners while ensuring data integrity and security.

## Features

- **Pet Profiles**: Create and manage detailed profiles for pets, including their ID, picture, breed, name, gender, age, and dietary preferences.
- **Owner Profiles**: Store and manage owner information, including name, contact details, and pets owned.
- **QR Code Integration**: Generate unique QR codes for each pet that can be scanned to access their profile easily.
- **Auto-Incrementing Age**: Automatically update the pet's age based on the date of birth.
- **Allergy Tracking**: Maintain a list of foods that pets are allergic to, ensuring their safety and health.
- **RESTful API**: Provides a clear and consistent interface for all operations, adhering to REST principles.
- **SOLID Architecture**: Designed following SOLID principles to ensure scalability, maintainability, and testability.

## API Endpoints

### Pet Endpoints

- **GET /pets**: Retrieve a list of all pets.
- **POST /pets**: Create a new pet profile.
- **GET /pets/:id**: Retrieve a specific pet profile by ID.
- **PUT /pets/:id**: Update a pet profile.
- **DELETE /pets/:id**: Delete a pet profile.

### Owner Endpoints

- **GET /owners**: Retrieve a list of all owners.
- **POST /owners**: Create a new owner profile.
- **GET /owners/:id**: Retrieve a specific owner profile by ID.
- **PUT /owners/:id**: Update an owner profile.
- **DELETE /owners/:id**: Delete an owner profile.

### QR Code Endpoints

- **GET /qrcodes**: Retrieve a list of all QR codes.
- **POST /qrcodes**: Generate a new QR code for a pet.
- **GET /qrcodes/:id**: Retrieve a specific QR code by ID.
- **PUT /qrcodes/:id**: Update QR code details.
- **DELETE /qrcodes/:id**: Delete a QR code.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Superset of JavaScript for type safety.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing pet and owner profiles.
