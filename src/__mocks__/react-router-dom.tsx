import React from 'react';

export const Routes = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const Route = ({ element }: { element: React.ReactNode }) => <>{element}</>;
export const Link = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <a href={to}>{children}</a>
);
export const useNavigate = () => jest.fn();
export const useLocation = () => ({ pathname: '/', search: '', hash: '', state: null });
export const useParams = () => ({});
