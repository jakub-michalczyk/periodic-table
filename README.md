**Periodic** is an application that uses Angular Material table to display periodic elements fetched via REST API, includes a search filter input that updates the displayed data without altering the original dataset, and allows inline editing of specific rows to update field values directly within the table.

<img src="https://github.com/jakub-michalczyk/periodic-table/blob/master/public/assets/logo.svg" width="200"/>

## Features

- **Material Table Integration**: Clean and responsive table built with Angular Material.

- **REST API Data Fetching**: Chemical elements are loaded dynamically from an external REST API.

- **Search Filtering**: A filter input allows users to dynamically search through the data without modifying the original dataset.

- **Inline Row Editing**: Each row can be edited directly within the table, allowing users to update specific field values interactively.

The project demonstrates efficient data handling, reactive UI updates, and user-friendly interaction using Angular best practices.
  
## Technologies Used

- **Angular 20**: For the front-end framework.
- **Angular Material**: For components library.
- **Tailwind CSS**: For styling.
- **NgRx Signals**: Employed for state management via reactive signals—encapsulating data and business logic in a centralized store, automatically updating the UI when state changes.

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: Recommended version 20 or higher.
- **Angular CLI**: If not installed, you can install it globally using the command:

```bash
npm install -g @angular/cli
```

## Setup
- **Clone repository:**
```bash
git clone https://github.com/jakub-michalczyk/periodic-table
```

- **Navigate to the project folder:**
```bash
cd periodic-table
```

- **Install the dependencies:**
```bash
npm install
```

- **Run the development server:**
```bash
ng serve
```

The app will be available at [http://localhost:4200](http://localhost:4200).

## Build for Production ##
To build the project for production, use the following command:
```bash
ng build --configuration=production
```
The build artifacts will be stored in the dist/ directory.

## License ##
This project is licensed under the MIT License - see the LICENSE file for details.
