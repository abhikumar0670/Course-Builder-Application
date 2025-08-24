import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@testing-library/jest-dom';
import DraggableModule from '../components/modules/DraggableModule';

describe('Drag and Drop Functionality', () => {
  const mockModule = {
    id: '1',
    name: 'Test Module',
    items: [
      { id: 'i1', type: 'file', title: 'File 1' },
      { id: 'i2', type: 'link', title: 'Link 1', url: 'https://example.com' },
    ]
  };

  test('renders draggable module with items', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <DraggableModule 
          module={mockModule}
          index={0}
          moveModule={jest.fn()}
          onDelete={jest.fn()}
          onRename={jest.fn()}
          onAddItem={jest.fn()}
          onDeleteItem={jest.fn()}
          onRenameItem={jest.fn()}
          moveItem={jest.fn()}
        />
      </DndProvider>
    );

    expect(screen.getByText('Test Module')).toBeInTheDocument();
    expect(screen.getByText('File 1')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
  });

  // Note: Testing actual drag and drop behavior would require more complex setup
  // with react-dnd-test-utils. This is a basic test to verify rendering.
});
