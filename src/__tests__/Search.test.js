import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseBuilder from '../components/modules/CourseBuilder';

describe('Search Functionality', () => {
  test('filters modules and items based on search term', async () => {
    render(<CourseBuilder />);
    
    // First add a module with items
    const addButton = screen.getByText('+');
    userEvent.click(addButton);
    userEvent.click(screen.getByText('Module'));
    
    fireEvent.change(screen.getByLabelText('Module name'), { 
      target: { value: 'React Basics' } 
    });
    userEvent.click(screen.getByText('Create'));
    
    // Add a file to the module
    userEvent.click(screen.getByLabelText('Add content to React Basics'));
    userEvent.click(screen.getByText('Upload'));
    
    const file = new File(['test content'], 'react-tutorial.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('Select file');
    userEvent.upload(fileInput, file);
    
    fireEvent.change(screen.getByLabelText('File title'), { 
      target: { value: 'React Tutorial' } 
    });
    userEvent.click(screen.getByText('Upload'));
    
    // Add a link
    userEvent.click(screen.getByLabelText('Add content to React Basics'));
    userEvent.click(screen.getByText('Link'));
    
    fireEvent.change(screen.getByLabelText('Link title'), { 
      target: { value: 'React Documentation' } 
    });
    
    fireEvent.change(screen.getByLabelText('URL'), { 
      target: { value: 'https://reactjs.org/docs' } 
    });
    
    userEvent.click(screen.getByText('Add'));
    
    // Test search
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Search for module
    fireEvent.change(searchInput, { target: { value: 'React Basics' } });
    expect(await screen.findByText('React Basics')).toBeInTheDocument();
    expect(screen.queryByText('Vue.js')).not.toBeInTheDocument();
    
    // Search for file
    fireEvent.change(searchInput, { target: { value: 'Tutorial' } });
    expect(await screen.findByText('React Tutorial')).toBeInTheDocument();
    
    // Search for link
    fireEvent.change(searchInput, { target: { value: 'Documentation' } });
    expect(await screen.findByText('React Documentation')).toBeInTheDocument();
    
    // Test no results
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    expect(screen.queryByText('React Basics')).not.toBeInTheDocument();
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
