import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('../App');

jest.mock('react-router-dom');

type ApiResponse = {
  response?: {
    docs: Array<{
      headline?: { main: string };
      byline?: { original: string };
      snippet?: string;
      web_url?: string;
      pub_date?: string;
    }>;
  };
};

const mockFetchResponse = (data: ApiResponse): Response => {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: () => mockFetchResponse(data),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(''),
    json: () => Promise.resolve(data)
  } as Response;
};

global.fetch = jest.fn() as jest.Mock;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/search for articles/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays loading state during search', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(mockFetchResponse({
        response: {
          docs: []
        }
      })), 100);
    }));

    render(<App />);
    
    const input = screen.getByPlaceholderText(/search for articles/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  test('displays articles after successful search', async () => {
    const mockArticles = {
      response: {
        docs: [
          {
            headline: { main: 'Test Article' },
            byline: { original: 'By Test Author' },
            snippet: 'Test snippet',
            web_url: 'https://example.com/article',
            pub_date: '2025-07-19T00:00:00Z'
          }
        ]
      }
    };
    
    (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockFetchResponse(mockArticles)));
    
    render(<App />);
    
    const input = screen.getByPlaceholderText(/search for articles/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('By Test Author')).toBeInTheDocument();
      expect(screen.getByText('Test snippet')).toBeInTheDocument();
    });
  });

  test('displays error message on failed search', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/search for articles/i);
    fireEvent.change(input, { target: { value: 'error' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch articles/i)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('shows article when search returns results', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/search for articles/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
    });
  });
});
