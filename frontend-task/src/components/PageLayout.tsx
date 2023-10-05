import React from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import { Layout } from 'antd'

import Sidebar from './Sidebar';
import UserProvider from './UserProvider';

const MainLayoutContainer = styled(Layout)`
  min-width: 100%;
  min-height: 100vh;
`;
const HeaderContainer = styled(Layout.Header)`
  background-color: #fff;
  box-shadow: 2px 4px 0px rgba(60,60,60,.1);
  z-index: 1;
`;
const ContentContainerBackground = styled(Layout.Content)`
  background-color: #ddd;
  padding: 8px;
`;
const ContentContainerMain = styled(Layout.Content)`
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
`;

export default function PageLayout() {  

  return (
    <MainLayoutContainer>
      <UserProvider>
      
        <Sidebar/>

        <Layout>
          <HeaderContainer>
            Header
          </HeaderContainer>
          <ContentContainerBackground>
            <ContentContainerMain>
              <Outlet/>
            </ContentContainerMain>
          </ContentContainerBackground>
        </Layout>

      </UserProvider>
    </MainLayoutContainer>
  )
}
