export const demoModules = [
  {
    id: '1',
    name: 'Introduction to React'
  },
  {
    id: '2', 
    name: 'Advanced React Concepts'
  },
  {
    id: '3',
    name: 'State Management'
  }
];

export const demoItems = [
  {
    id: '1',
    moduleId: '1',
    type: 'link',
    title: 'React Documentation',
    url: 'https://reactjs.org/docs'
  },
  {
    id: '2',
    moduleId: '1', 
    type: 'file',
    title: 'React Basics Presentation',
    fileName: 'react-basics.pdf',
    fileSize: 2048000,
    fileType: 'application/pdf'
  },
  {
    id: '3',
    moduleId: '2',
    type: 'link', 
    title: 'React Hooks Guide',
    url: 'https://reactjs.org/docs/hooks-intro.html'
  },
  {
    id: '4',
    moduleId: '2',
    type: 'file',
    title: 'Custom Hooks Examples',
    fileName: 'custom-hooks.zip',
    fileSize: 1024000,
    fileType: 'application/zip'
  },
  {
    id: '5',
    moduleId: '3',
    type: 'link',
    title: 'Redux Tutorial',
    url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts'
  },
  {
    id: '6',
    moduleId: null, // Standalone resource
    type: 'link',
    title: 'Course Resources Repository',
    url: 'https://github.com/course-resources'
  }
];
