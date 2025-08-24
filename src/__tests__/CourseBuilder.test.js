import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CourseBuilder from '../components/modules/CourseBuilder';

describe('CourseBuilder Component', () => {
  beforeEach(() => {
    // Mock window.URL.createObjectURL for file downloads
    global.URL.createObjectURL = jest.fn();
  });

  test('renders course builder with empty state', () => {
    render(<CourseBuilder />);
    expect(screen.getByText('Course Builder')).toBeInTheDocument();
    expect(screen.getByText('No modules added yet')).toBeInTheDocument();
  });

  test('can add a new module', async () => {
    render(<CourseBuilder />);
    
    // Click add button and select module
    const addButton = screen.getByText('+');
    userEvent.click(addButton);
    
    const moduleOption = screen.getByText('Module');
    userEvent.click(moduleOption);
    
    // Fill module name and save
    const input = screen.getByLabelText('Module name');
    fireEvent.change(input, { target: { value: 'Test Module' } });
    
    const saveButton = screen.getByText('Create');
    userEvent.click(saveButton);
    
    // Verify module was added
    expect(await screen.findByText('Test Module')).toBeInTheDocument();
  });

  test('can add a file resource', async () => {
    render(<CourseBuilder />);
    
    // First add a module
    const addButton = screen.getByText('+');
    userEvent.click(addButton);
    const moduleOption = screen.getByText('Module');
    userEvent.click(moduleOption);
    
    const input = screen.getByLabelText('Module name');
    fireEvent.change(input, { target: { value: 'Test Module' } });
    
    const saveButton = screen.getByText('Create');
    userEvent.click(saveButton);
    
    // Add a file resource
    const moduleAddButton = screen.getByLabelText('Add content to Test Module');
    userEvent.click(moduleAddButton);
    
    const uploadOption = screen.getByText('Upload');
    userEvent.click(uploadOption);
    
    // Mock file upload
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('Select file');
    userEvent.upload(fileInput, file);
    
    // Set file title
    const titleInput = screen.getByLabelText('File title');
    fireEvent.change(titleInput, { target: { value: 'Test PDF' } });
    
    // Submit the form
    const uploadButton = screen.getByText('Upload');
    userEvent.click(uploadButton);
    
    // Verify file was added
    expect(await screen.findByText('Test PDF')).toBeInTheDocument();
  });
});
