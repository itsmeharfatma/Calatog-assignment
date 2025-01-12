## Overview

This project implements a responsive and interactive chart component using React, Chart.js, and TailwindCSS. The application allows users to view price data across various time ranges and supports full-screen functionality. The project also integrates data fetching from a mock API service (MockAPI).

## Features

1. Responsive Chart: Built with Chart.js and styled using TailwindCSS.

2. MockAPI Integration: Fetches dynamic data from MockAPI.

3. Dynamic Time Ranges: Users can select different time ranges (e.g., 1d, 1w, 1m) to update the chart data dynamically.

4. Full-Screen Mode: Users can toggle full-screen mode for a better viewing experience.

5. Custom Hooks: Includes a custom hook (useWindowWidth) to handle responsive chart scaling.

## Installation

Clone the Repository:

### `git clone https://github.com/itsmeharfatma/Calatog-assignment.git`

Install Dependencies:

### `npm install`

Start the Development Server:

### `npm run start`

Open in Browser:

Navigate to http://localhost:3000 to view the application.

## Dependencies

React: For building the UI components.

Chart.js: For rendering the charts.

TailwindCSS: For styling the application.

Axios: For making API requests.

## Deployment

1. Build for Production:

### `npm run build`

2. Deploy on Vercel:

Create a Vercel account and link your GitHub repository.

Deploy the application directly from the Vercel dashboard.
