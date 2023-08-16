# Control Center Project

Welcome to the Control Center Project repository! This project is developed using ReactJS with Typescript for the frontend, Redux Toolkit and Redux Saga as middleware for state management, Spring Boot Java for the API server, and MySQL as the database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Frontend](#frontend)
  - [Tech Stack](#tech-stack-frontend)
  - [Folder Structure](#folder-structure-frontend)
- [Backend](#backend)
  - [Tech Stack](#tech-stack-backend)
  - [Project Structure](#project-structure-backend)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Control Center Project aims to provide a comprehensive solution for managing and controlling various aspects of a system. It leverages modern technologies and best practices to create a user-friendly interface for efficient system management.

## Features

- User authentication and authorization
- Dashboard for real-time system monitoring
- Configurable settings and controls
- Data visualization through charts and graphs
- Seamless communication with the backend API
- Data persistence using MySQL database

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed:

- Node.js
- npm (Node Package Manager)
- Java Development Kit (JDK)
- MySQL Server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/control-center-project.git
   cd control-center-project

## Frontend

### Tech Stack (Frontend)

- ReactJS with Typescript
- Redux Toolkit for state management
- Redux Saga for middleware
- Material-UI for UI components

### Folder Structure

```bash
control-center-project/
  ├── frontend/
  │    ├── public/
  │    ├── src/
  │    │    ├── assets/
  │    │    ├── components/
  │    │    ├── pages/
  │    │    ├── store/
  │    │    ├── utils/
  │    │    ├── App.tsx
  │    │    └── index.tsx
  │    ├── package.json
  │    └── ...
  └── ...
```

## Backend

### Tech Stack (Backend)

- Spring Boot Java
- MySQL database

### Project Structure

```bash
control-center-project/

├── src/
│    ├── main/
│    │    ├── java/
│    │    │    ├── com/
│    │    │    │    ├── controlcenter/
│    │    │    │    │    ├── controlcenter/
│    │    │    │    │    │    ├── controllers/
│    │    │    │    │    │    ├── dao/
│    │    │    │    │    │    ├── mapper/
│    │    │    │    │    │    ├── model/
│    │    │    │    │    │    └── ControlCenterApplication.java
│    │    │    │    │    └── ...
│    │    └── resources/
│    │         ├── mappers/
│    │         └── application.properties
│    │         └── ...
│    └── test/
│         └── ...
└── ...

