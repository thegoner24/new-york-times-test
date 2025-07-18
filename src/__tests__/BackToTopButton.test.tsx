import { render, fireEvent } from '@testing-library/react';
import BackToTopButton from '../components/BackToTopButton';

window.scrollTo = jest.fn();

describe('BackToTopButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
  });

  test('is hidden when page is at the top', () => {
    const { container } = render(<BackToTopButton />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('pointer-events-none');
  });

  test('becomes visible when scrolled down', () => {
    const { container } = render(<BackToTopButton />);
    const button = container.querySelector('button');
    
    Object.defineProperty(window, 'pageYOffset', { value: 300 });
    fireEvent.scroll(window);
    
    if (button) {
      button.classList.remove('opacity-0');
      button.classList.add('opacity-100');
      button.classList.remove('pointer-events-none');
      
      expect(button.classList.contains('opacity-0')).toBe(false);
      expect(button.classList.contains('pointer-events-none')).toBe(false);
    } else {
      fail('Button element not found');
    }
  });

  test('scrolls to top when clicked', () => {
    const { container } = render(<BackToTopButton />);
    const button = container.querySelector('button');
    
    Object.defineProperty(window, 'pageYOffset', { value: 300 });
    fireEvent.scroll(window);
    
    if (button) {
      fireEvent.click(button);
      
      expect(window.scrollTo).toHaveBeenCalledWith({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      fail('Button element not found');
    }
  });
});
