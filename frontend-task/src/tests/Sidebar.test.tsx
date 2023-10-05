import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

import Sidebar from '../components/Sidebar';
import { UserContext } from '../components/UserProvider';


describe("Sidebar Test", () => {
  test('Sidebar user data is fetched', () => {
    const userInfo = { id: 8, name:"Jane Doe"};
    render(
      <BrowserRouter>
        <UserContext.Provider value={userInfo}>
            <Sidebar />
        </UserContext.Provider>
      </BrowserRouter>
    )
  
    const userNameElement = screen.getByTestId("sidebar-userName");
    expect(userNameElement).toBeInTheDocument();
    expect(userNameElement).toHaveTextContent("Jane Doe");
  });
});

