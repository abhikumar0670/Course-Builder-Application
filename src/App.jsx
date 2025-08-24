import './App.css';
import CourseBuilder from './components/modules/CourseBuilder';
import DragDropProvider from './components/DragDropProvider';

function App() {
  return (
    <DragDropProvider>
      <div className="app">
        <CourseBuilder />
      </div>
    </DragDropProvider>
  );
}

export default App;
