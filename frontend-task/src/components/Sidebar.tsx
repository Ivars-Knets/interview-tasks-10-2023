import React from 'react'
import styled from 'styled-components'
import { AppstoreOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserProvider';

const sidebarWidth = "200px";
const SiderContainer = styled(Layout.Sider)`
    width: ${sidebarWidth};
    box-shadow: 4px 0px 4px rgba(60,60,60,.1);
    background-color: #fff !important;
`;
const LogoContainer = styled.div`
    height: 64px;
    width: ${sidebarWidth};
    background-color: #44f;
`;
const UserContainer = styled.div`
    width: ${sidebarWidth};
    background-color: #fff;
    padding-bottom: 12px;
`;
const UserAvatar = styled(Avatar)`
    margin: 16px 60px 6px;
`;
const UserGreeting = styled.div`
    display:block;
    color: rgba(0,0,0, 0.5);
    width: 100%;
    text-align: center;
`;
const UserName = styled.div`
    display:block;
    color: rgba(0,0,0, 1);
    width: 100%;
    text-align: center;
    font-size: 1.1rem;
`;
const MenuContainer = styled(Menu)`
    width: ${sidebarWidth};
    background-color: #fff;
`;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    items?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        items,
        label,
        type,
    } as MenuItem;
}
const items: MenuProps['items'] = [    
    getItem(<Link to="/dashboard">Dashboard</Link>, 'dashboard', <AppstoreOutlined />),
    getItem(<Link to="/blogs">Blogs</Link>, 'blog', <MailOutlined />),
];

type UserInfo = {
    id?: number
    name?: string
}



export default function Sidebar() {
    const userInfo: UserInfo = useUserContext();

    return (
        <SiderContainer >
            <LogoContainer>
                <img src="" alt="Logo" />
            </LogoContainer>
            <UserContainer>
                <UserAvatar size={80} icon={<UserOutlined />} />
                <UserGreeting>Hello</UserGreeting>
                <UserName data-testid="sidebar-userName" id="user_name">{userInfo?.name}</UserName>                
            </UserContainer>
            <MenuContainer
                theme="light" 
                defaultSelectedKeys={["1"]} 
                mode="vertical"             
                items={items}
            ></MenuContainer>
        </SiderContainer>
    )
}
