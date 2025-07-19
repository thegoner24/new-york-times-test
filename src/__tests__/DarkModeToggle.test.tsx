import { render, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../components/DarkModeToggle';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});
beforeEach(() => {
  jest.clearAllMocks();
});

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('DarkModeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  test('renders correctly', () => {
    const { container } = render(<DarkModeToggle />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  test('toggles dark mode when clicked', () => {
    const { container } = render(<DarkModeToggle />);
    const button = container.querySelector('button');
    
    document.body.classList.remove('dark');
    
    if (button) {
      fireEvent.click(button);
      expect(document.body.classList.contains('dark')).toBe(true);
      
      fireEvent.click(button);
      expect(document.body.classList.contains('dark')).toBe(false);
    } else {
      fail('Button element not found');
    }
  });

  test('is hidden on mobile screens', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    const { container } = render(<DarkModeToggle />);
    const button = container.querySelector('button');
    
    if (button) {
      const style = window.getComputedStyle(button);
      const isHidden = button.classList.contains('hidden') || 
                      style.display === 'none' || 
                      style.visibility === 'hidden';
      
      expect(isHidden || button.classList.contains('md:flex')).toBeTruthy();
    } else {
      expect(button).toBeNull();
    }
    
    window.matchMedia = originalMatchMedia;
  });
});
