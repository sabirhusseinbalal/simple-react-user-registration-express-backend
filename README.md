# React User Registration Form with Express Backend

A responsive user registration form built with React and styled using Tailwind CSS. The form validates user input with react-hook-form and communicates with an Express backend to handle submissions.


## Technologies Used
- **React**
- **Tailwind CSS**
- **Express.js**
- **Axios**
- **react-hook-form**

## Features
- User input validation
- Responsive design
- Integration with a backend API
- Error handling for existing usernames

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

#### Frontend Setup

1. Create a new Vite project:

   ```bash
   npm create vite@latest
   ```

2. Install Tailwind CSS and its dependencies:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. Initialize Tailwind CSS:

   ```bash
   npx tailwindcss init -p
   ```

4. Install Axios and react-hook-form:

   ```bash
   npm install axios react-hook-form
   ```


## Paste this in tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Paste this in index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


### Run (Frontend Terminal)
```bash
npm run dev
```

---
## Create a my-backend Folder


### Open this folder in VS Code:

```bash
npm init -y
```

```bash
npm install express body-parser cors
```

```bash
npm install body-parser
```

### Run (Backend Terminal)

```bash
npm start
```


---
---
### If it does not work, I have included a video named *React-Form.mp4*. You can watch it and install the necessary modules.
---
---



