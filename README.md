# Dynamic Event Calendar
[LIVE DEMO](https://dynamic-event-calendar-beta.vercel.app/)

A modern and feature-rich calendar application that enables efficient event management and scheduling. Built with React and styled using **shadcn**, the app provides a clean and interactive user experience.

## Features

### Calendar View
- Displays a calendar grid for the current month with all days properly aligned.
- Navigate between months seamlessly using "Previous" and "Next" buttons.
- Highlights the current day and the selected day for better visual clarity.

### Event Management
- Easily add events by clicking on any day in the calendar.
- Edit or delete existing events with an intuitive interface.
- Comprehensive event details include:
  - Event name
  - Start time and end time
  - Optional description

### Event List and Filtering
- View all events for the selected day in a modal or side panel.
- Filter events by keywords for efficient navigation through your schedule.

### Drag-and-Drop Scheduling
- Reschedule events effortlessly by dragging and dropping them to different days on the calendar.

### Data Persistence
- Events are stored using **localStorage**, ensuring data remains available between page refreshes.

### Export Functionality
- Export your events for a specific month in **JSON** or **CSV** format, enabling easy sharing and backup.

### Visual Enhancements
- Color-coded events based on categories such as work, personal, or others for quick identification.
- Distinct styles for weekends and weekdays to enhance readability.

### Intelligent Scheduling
- Automatically handles complex date transitions, such as moving from the last day of one month to the first day of the next.
- Prevents scheduling conflicts by detecting overlapping events.

## Tech Stack
- **React**: Core library for building the user interface.
- **shadcn**: For clean, modern, and reusable UI components.
- **localStorage**: Ensures event data is retained between sessions.

## Installation and Usage

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone [<repository-url>](https://github.com/anushkaps/dynamic-event-calendar.git)
   ```
2. Navigate to the project directory:
   ```bash
   cd dynamic-event-calendar
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Deployed Application
Access the live version of the app here: [Deployed Link](https://dynamic-event-calendar-beta.vercel.app/) (Replace with actual link)

## Challenges and Learning
This project was an opportunity to apply advanced React concepts, implement intricate event scheduling logic, and design an intuitive UI. Key challenges included:
- Ensuring seamless drag-and-drop functionality without breaking the calendar structure.
- Implementing conflict detection for overlapping events.
- Creating a modular and reusable component structure with **shadcn**.

Through this project, I enhanced my skills in managing state, optimizing component performance, and designing user-friendly interfaces.

For any issues or contributions, feel free to open a pull request or issue on the repository.
