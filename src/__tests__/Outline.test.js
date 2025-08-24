import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Outline from '../components/ui/Outline';

describe('Outline Component', () => {
  const mockModules = [
    { id: '1', name: 'Module 1' },
    { id: '2', name: 'Module 2' },
  ];

  const mockItems = [
    { id: 'i1', moduleId: '1', type: 'file', title: 'File 1' },
    { id: 'i2', moduleId: '1', type: 'link', title: 'Link 1', url: 'https://example.com' },
    { id: 'i3', moduleId: '2', type: 'file', title: 'File 2' },
  ];

  test('renders outline with modules and items', () => {
    render(
      <Outline 
        modules={mockModules} 
        items={mockItems} 
        activeModuleId="1" 
        onModuleClick={jest.fn()} 
      />
    );

    expect(screen.getByText('Course Outline')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
    expect(screen.getByText('File 1')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('File 2')).toBeInTheDocument();
  });

  test('calls onModuleClick when a module is clicked', () => {
    const handleModuleClick = jest.fn();
    
    render(
      <Outline 
        modules={mockModules} 
        items={mockItems} 
        activeModuleId="1"
        onModuleClick={handleModuleClick}
      />
    );

    const module2 = screen.getByText('Module 2');
    fireEvent.click(module2);
    
    expect(handleModuleClick).toHaveBeenCalledWith('2');
  });

  test('shows item counts for modules', () => {
    render(
      <Outline 
        modules={mockModules} 
        items={mockItems} 
        activeModuleId="1"
        onModuleClick={jest.fn()}
      />
    );

    // Module 1 should show 2 items
    expect(screen.getByText('(2 items)')).toBeInTheDocument();
    // Module 2 should show 1 item
    expect(screen.getByText('(1 item)')).toBeInTheDocument();
  });
});
