# 📚 Course Builder Application

A modern, interactive React.js application that allows educators and content creators to organize and manage course materials. This feature-rich application provides an intuitive interface for building structured courses with modules, resources, and interactive elements.

![Course Builder Screenshot](src/assets/screenshot.png)

## 🎥 Demo Video

[▶️ Watch Demo Video](https://drive.google.com/file/d/1vbLE0gbuBXuwIW-KMRHPiikF2OMLvZNF/view?usp=sharing)


## 🚀 Features

### ✅ Completed Features

- **Module Management**
  - ✅ Create, edit, and delete course modules
  - ✅ Expandable/collapsible module views
  - ✅ Module renaming with inline editing

- **Resource Management**
  - ✅ Add links with title and URL validation
  - ✅ Upload files (images, PDFs, documents) with file size display
  - ✅ Rename and delete resources
  - ✅ Support for standalone resources (outside modules)

- **Drag & Drop Functionality**
  - ✅ Reorder modules by dragging
  - ✅ Move resources between modules
  - ✅ Drag resources within the same module
  - ✅ Visual feedback during drag operations

- **Course Outline**
  - ✅ Sidebar outline with module navigation
  - ✅ Click-to-scroll functionality
  - ✅ Automatic highlighting of active module on scroll
  - ✅ Responsive design for mobile devices

- **Search Functionality**
  - ✅ Real-time search across modules and resources
  - ✅ Search by module name, resource title, URL, or filename
  - ✅ Smart filtering that shows parent modules for matching resources
  - ✅ "No results" state with helpful messaging

- **User Interface**
  - ✅ Modern, clean design following Figma specifications
  - ✅ Responsive layout for desktop, tablet, and mobile
  - ✅ Intuitive modal dialogs for adding/editing content
  - ✅ Smooth animations and transitions
  - ✅ Empty states with clear call-to-action

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/course-builder.git
   cd course-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Testing

Run the test suite with:
```bash
npm test
# or
yarn test
```

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **State Management**: React Hooks
- **Drag & Drop**: react-dnd 16.0.1
- **Testing**: Jest, React Testing Library
- **Styling**: CSS Modules

## 🐛 Bug Fixes & Improvements

### Fixed Issues
- **File Download**: Resolved invalid PDF generation by implementing proper file data handling
- **Outline Sync**: Improved active module detection during scroll
- **Search**: Fixed case sensitivity and special character handling
- **Performance**: Optimized re-renders and state updates

### Recent Improvements
- Added comprehensive test coverage
- Improved accessibility (a11y)
- Enhanced mobile responsiveness
- Added loading states and error boundaries

## 📂 Project Structure

```
my-react-app/
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .prettierignore      # Files to ignore by Prettier
├── .vscode/             # VS Code settings
├── public/              # Public assets
├── src/                 # Source files
│   ├── assets/          # Static assets
│   ├── components/      # React components (add as needed)
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
└── index.html           # HTML template
```

```
src/
  ├── components/
  │   ├── modules/
  │   │   ├── CourseBuilder.jsx     # Main component that orchestrates the application
  │   │   ├── ModuleCard.jsx        # Component for displaying individual modules
  │   │   ├── ModuleModal.jsx       # Modal for creating/editing modules
  │   │   ├── ModuleItem.jsx        # Component for displaying module items (links, files)
  │   │   ├── LinkModal.jsx         # Modal for adding links to modules
  │   │   └── UploadModal.jsx       # Modal for uploading files to modules
  │   └── ui/
  │       ├── Header.jsx            # Application header with search and dropdown
  │       └── EmptyState.jsx        # Shown when no modules exist
  ├── assets/
  ├── App.jsx                       # App entry point
  ├── App.css                       # Application styling
  ├── main.jsx
  └── index.css
```

## Application Architecture

### Component Hierarchy

```
App
└── CourseBuilder
    ├── Header
    ├── EmptyState (conditionally rendered)
    ├── ModuleCard (multiple instances)
    │   └── ModuleItem (multiple instances)
    ├── ModuleModal
    ├── LinkModal
    └── UploadModal
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Abhishek Kumar | Course Builder Application
