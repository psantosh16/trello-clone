![image](https://github.com/user-attachments/assets/f90c699f-bde6-45dd-bfcb-10862e27176a)


# Tasakus
Tasakus [(Tasuku) means "task" in Japanese*] is a simple Trello clone built with Next.js and Redux, designed to replicate core functionalities of the popular task management tool, Trello.

## Features

- **Task Management:** Create, edit, and delete tasks within customizable boards and lists.
- **Drag and Drop Interface:** Intuitive drag-and-drop functionality for organizing tasks.
- **State Management:** Utilizes Redux for efficient state management across the application.
- **Authentication:** Implements user authentication using Firebase and JWT.
- **Database Integration:** Employs Prisma as the ORM for database interactions.

## Technologies Used

- [Next.js](https://nextjs.org/): React-based framework for server-side rendering and static site generation.
- [Redux](https://redux.js.org/): State management library for JavaScript applications.
- [Firebase](https://firebase.google.com/): Platform for authentication and real-time database services.
- [JWT (JSON Web Tokens)](https://jwt.io/): Standard for securely transmitting information between parties.
- [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast, and scalable state management solution.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or later)
- [pnpm](https://pnpm.io/installation)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/psantosh16/tasakus.git
   cd tasakus
   ```

2. **Install dependencies:**

   Using pnpm:

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   - Rename `.env.sample` to `.env`:

     ```bash
     mv .env.sample .env
     ```

   - Update the `.env` file with your credentials and any other necessary environment variables.

4. **Initialize the database:**

   ```bash
   npx prisma migrate dev
   ```

   This will apply the database migrations and set up the database schema.

5. **Start the development server:**

With pnpm:

```bash
pnpm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

```bash
tasakus/
├─ src/
│   ├─ action/               # Redux action creators
│   ├─ app/                  # Next.js application directory
│   ├─ components/           # Reusable UI components
│   ├─ constants/            # Application-wide constants
│   ├─ hooks/                # Custom React hooks
│   ├─ lib/                  # Utility functions and libraries
│   ├─ styles/               # Global and component-specific styles
│   └─ pages/                # Next.js pages
├─ prisma/                   # Prisma schema and migrations
├─ public/                   # Static assets
├─ config/                   # Configuration files
└─ .env                      # Environment variables
```


## Acknowledgements

- [Trello](https://trello.com/) for the inspiration.
- The developers and maintainers of the technologies used in this project.

For more information, visit the live application at [tasukus.vercel.app](https://tasukus.vercel.app/).
