import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CourseBuilder from '../components/modules/CourseBuilder';

describe('Link Handling', () => {
  test('adds and removes a link', async () => {
    render(<CourseBuilder />);
    
    // Add a module
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('Module'));
    
    fireEvent.change(screen.getByLabelText('Module name'), { 
      target: { value: 'Links Module' } 
    });
    userEvent.click(screen.getByText('Create'));
    
    // Add a link
    userEvent.click(screen.getByLabelText('Add content to Links Module'));
    userEvent.click(screen.getByText('Link'));
    
    // Fill link form
    fireEvent.change(screen.getByLabelText('Link title'), { 
      target: { value: 'React Docs' } 
    });
    
    fireEvent.change(screen.getByLabelText('URL'), { 
      target: { value: 'https://reactjs.org' } 
    });
    
    userEvent.click(screen.getByText('Add'));
    
    // Verify link was added
    const linkElement = await screen.findByText('React Docs');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', 'https://reactjs.org');
    
    // Test link opens in new tab
    expect(linkElement.closest('a')).toHaveAttribute('target', '_blank');
    expect(linkElement.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Test link deletion
    const optionsButton = screen.getByLabelText('Options for React Docs');
    userEvent.click(optionsButton);
    
    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);
    
    // Verify link was removed
    await waitFor(() => {
      expect(screen.queryByText('React Docs')).not.toBeInTheDocument();
    });
  });
  
  test('validates link URL format', async () => {
    render(<CourseBuilder />);
    
    // Add a module
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('Module'));
    
    fireEvent.change(screen.getByLabelText('Module name'), { 
      target: { value: 'Validation Test' } 
    });
    userEvent.click(screen.getByText('Create'));
    
    // Add a link with invalid URL
    userEvent.click(screen.getByLabelText('Add content to Validation Test'));
    userEvent.click(screen.getByText('Link'));
    
    // Fill with invalid URL
    fireEvent.change(screen.getByLabelText('Link title'), { 
      target: { value: 'Invalid Link' } 
    });
    
    fireEvent.change(screen.getByLabelText('URL'), { 
      target: { value: 'not-a-valid-url' } 
    });
    
    // Add button should be disabled for invalid URL
    expect(screen.getByText('Add')).toBeDisabled();
    
    // Fix the URL
    fireEvent.change(screen.getByLabelText('URL'), { 
      target: { value: 'https://valid-url.com' } 
    });
    
    // Add button should now be enabled
    expect(screen.getByText('Add')).not.toBeDisabled();
  });
});
