import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CourseBuilder from '../components/modules/CourseBuilder';

describe('File Handling', () => {
  // Mock URL.createObjectURL
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'test-url');
  });

  afterAll(() => {
    global.URL.createObjectURL.mockReset();
  });

  test('uploads and downloads a file', async () => {
    render(<CourseBuilder />);
    
    // Add a module
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('Module'));
    
    fireEvent.change(screen.getByLabelText('Module name'), { 
      target: { value: 'Test Module' } 
    });
    userEvent.click(screen.getByText('Create'));
    
    // Add a file
    userEvent.click(screen.getByLabelText('Add content to Test Module'));
    userEvent.click(screen.getByText('Upload'));
    
    const testFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('Select file');
    
    // Mock FileReader
    const fileReaderMock = {
      readAsArrayBuffer: jest.fn(),
      onload: jest.fn(),
      result: new ArrayBuffer(8)
    };
    
    global.FileReader = jest.fn(() => fileReaderMock);
    
    // Trigger file upload
    userEvent.upload(fileInput, testFile);
    
    // Simulate FileReader onload event
    fileReaderMock.onload({ target: { result: fileReaderMock.result } });
    
    // Set file title and submit
    fireEvent.change(screen.getByLabelText('File title'), { 
      target: { value: 'Test PDF' } 
    });
    
    userEvent.click(screen.getByText('Upload'));
    
    // Verify file was added
    expect(await screen.findByText('Test PDF')).toBeInTheDocument();
    
    // Test download
    const optionsButton = screen.getByLabelText('Options for Test PDF');
    userEvent.click(optionsButton);
    
    const downloadButton = screen.getByText('Download');
    userEvent.click(downloadButton);
    
    // Verify download was triggered
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
  
  test('shows error for invalid file upload', async () => {
    render(<CourseBuilder />);
    
    // Add a module
    userEvent.click(screen.getByText('+'));
    userEvent.click(screen.getByText('Module'));
    
    fireEvent.change(screen.getByLabelText('Module name'), { 
      target: { value: 'Test Module' } 
    });
    userEvent.click(screen.getByText('Create'));
    
    // Try to add a file without selecting one
    userEvent.click(screen.getByLabelText('Add content to Test Module'));
    userEvent.click(screen.getByText('Upload'));
    
    // Set file title but no file
    fireEvent.change(screen.getByLabelText('File title'), { 
      target: { value: 'Invalid File' } 
    });
    
    // Upload button should be disabled
    expect(screen.getByText('Upload')).toBeDisabled();
  });
});
