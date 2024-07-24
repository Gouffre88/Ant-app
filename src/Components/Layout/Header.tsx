// // import React, { useState } from 'react';
// // import { Menu, Image, MenuProps } from 'antd';
// // import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// // import { userModel } from '../../Interfaces';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from "../../Storage/Redux/store";
// // import { useNavigate } from 'react-router-dom';
// // import { emptyUserState, setLoggedInUser } from '../../Storage/Redux/userAuthSlice';


// // let logo = require("../../Assets/Images/logo.png");
// // type MenuItem = Required<MenuProps>['items'][number];

// // const Header: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
// //   const [current, setCurrent] = useState('home');

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     dispatch(setLoggedInUser({ ...emptyUserState }));
// //     navigate("/");
// //   };

// //   const items: MenuItem[] = [
// //     {
// //       label: (
// //         <Image
// //           width={40}
// //           src={logo}
// //           alt="logo"
// //           title="Home"
// //         />
// //       ),
// //       key: 'home',
// //     },
// //     {
// //       label: 'CyberTechNet',
// //       key: 'brand',
// //     },
// //     {
// //       label: 'AdminPanel',
// //       key: 'admin',
// //       children: [
// //         {
// //           label: 'GamesItems',
// //           key: 'gameitems',
// //         },
// //         {
// //           label: 'Tournament',
// //           key: 'tournament',
// //         },
// //       ],
// //     },
// //     {
// //       label: 'Хуки обычные',
// //       key: 'hooks',
// //     },
// //     {
// //       label: 'MUI',
// //       key: 'mui',
// //     },
// //     {
// //       label: 'useCallback',
// //       key: 'callback',
// //     },
// //     {
// //       label: 'Custom hooks',
// //       key: 'custom',
// //     },
// //   ];

// //   if (userData.id) {
// //     items.push({
// //       label: `Signed in as: ${userData.fullName}`,
// //       key: 'profile',
// //       children: [
// //         {
// //           label: 'Logout',
// //           key: 'logout',
// //           onClick: handleLogout,
// //         },
// //       ],
// //     });
// //   } else {
// //     items.push({
// //       label: 'Login',
// //       key: 'login',
// //     });
// //     items.push({
// //       label: 'Register',
// //       key: 'register',
// //     });
// //   }

// //   const onClick: MenuProps['onClick'] = (e) => {
// //     console.log('click ', e);
// //     setCurrent(e.key);
// //   };

// //   return (
// //     <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
// //   );
// // };

// // export default Header;


import React, { useState } from 'react';
import { Menu, Image, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { userModel } from '../../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../Storage/Redux/store";
import { useNavigate } from 'react-router-dom';
import { emptyUserState, setLoggedInUser } from '../../Storage/Redux/userAuthSlice';
import { Col, Row } from 'antd';



let logo = require("../../Assets/Images/logo.png");
type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const [current, setCurrent] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  const items: MenuItem[] = [
    {
      label: (
        <Image
          width={40}
          src={logo}
          alt="logo"
          title="Home"
        />
      ),
      key: 'home',
    },
    {
      label: 'CyberTechNet',
      key: 'brand',
    },
    {
      label: 'AdminPanel',
      key: 'admin',
      children: [
        {
          label: 'GamesItems',
          key: 'gameitems',
        },
        {
          label: 'Tournament',
          key: 'tournament',
        },
      ],
    },
    {
      label: 'Хуки обычные',
      key: 'hooks',
    },
    {
      label: 'MUI',
      key: 'mui',
    },
    {
      label: 'useCallback',
      key: 'callback',
    },
    {
      label: 'Custom hooks',
      key: 'custom',
    },
  ];

//   if (userData.id) {
//     items.push({
//       label: 'Signed in as: ${ userData.fullName }',
//       key: 'profile',
//       children: [
//       {
//         label: 'Logout',
//         key: 'logout',
//         onClick: handleLogout,
//       },
//     ],
//   });
//   } else {
//     items.push({
//       label: 'Login',
//       key: 'login',

//     });
//     items.push({
//       label: 'Register',
//       key: 'register',
//     });
//  }



const loginItems: MenuItem[] = [
  {
    label: 'Login',
    key: 'login',
  },

  {
    label: 'Register',
    key: 'register',
  },
]

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click ', e);
  setCurrent(e.key);
};

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Nav.Link className="App-link" aria-current="page" href="/">
            <img src={logo} style={{ height: '40px' }} className="m-1" title='Home'/>
          </Nav.Link>
          <Navbar.Brand href="/">CyberTechNet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
          
              <NavDropdown title='AdminPanel' id="basic-nav-dropdown">
                <NavDropdown.Item className="App-link" href="/gameitems">GamesItems</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/tournament">Tournament</NavDropdown.Item>
              </NavDropdown>

              

              <Nav.Link className="App-link" href="/hooks">Хуки обычные</Nav.Link>
              <Nav.Link className="App-link" href="/mui">MUI</Nav.Link>
              <Nav.Link className="App-link" href="/callback">useCallback</Nav.Link>
              <Nav.Link className="App-link" href="/custom">Custom hooks</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {userData.id && (
                <NavDropdown title={`Signed in as: ${userData.name}`} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
               {!userData.id && (
                <>
                  <Nav.Link className="App-link" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="App-link" href="/register">
                    Register
                  </Nav.Link>
                </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;


// import { Menu, Image, MenuProps, Space } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userModel } from "../../Interfaces";

// import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/userAuthSlice";
// import { RootState } from "../../Storage/Redux/store";

// import { Layout, Row, Col, Avatar } from "antd";
// import { HomeOutlined } from "@ant-design/icons";
// import MenuItem from "antd/es/menu/MenuItem";
// import { current } from "@reduxjs/toolkit";

// const { Header } = Layout;


// let logoPic = require("../../Assets/Images/123.jpg");

// const NavigateMenu: React.FC = () => {
//     const [currentMenuGames, setCurrentMenuGames] = useState('');
//     const [currentMenuAdminAndUser, setCurrentMenuAdminAndUser] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const userData: userModel = useSelector(
//         (state: RootState) => state.userAuthStore
//     );

//     type MenuItemAdminAndUser = Required<MenuProps>['items'][number];

//     type MenuItemGame = Required<MenuProps>['items'][number];

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         dispatch(setLoggedInUser({ ...emptyUserState }));
//         navigate("/");
//     };

//     const itemsAdminAndUser: MenuItemAdminAndUser[] = [
//         {
//             label: 'Admin',
//             key: 'admin',
//             icon: <SettingOutlined />,
//             disabled: userData.role?.valueOf() === "admin",
//             children: [
//                 { label: (<Link to={"/info"}>Новости</Link>), key: 'info' },
//                 { label: (<Link to={"/country"}>Страны</Link>), key: 'country' },
//                 { label: (<Link to={"/player"}>Игроки</Link>), key: 'player' },
//                 { label: (<Link to={"/team"}>Команды</Link>), key: 'team' },
//                 { label: (<Link to={"/tournament"}>Турниры</Link>), key: 'tournament' },
//             ],
//         },
//         {
//             label: 'User',
//             key: 'user',
//             icon: <UserOutlined />,           
//             children: 
//             userData.id ? [
//                 { label: <Link onClick = {handleLogout} to={"/"}>Выход</Link>, key: 'logout',   },
//             ] : 
//             [
//                 {
//                     label: (<Link to={"/login"}>Вход</Link>),
//                     key: 'login'
//                 },
//                 {
//                     label: (<Link to={"/register"}>Регистрация</Link>),
//                     key: 'register'
//                 }
//             ],
//         }
//     ];


//  const leftMenuItems : MenuItemGame[] = [
//   {
//       label: (<Link to={"/game1"}>Game 1</Link>),
//       key: 'game1',
//       icon: <XOutlined />,
//   },
//   {
//       label: (<Link to={"/game2"}>Game 2</Link>),
//       key: 'game2',
//       icon: <XOutlined />,
//   },
//   {
//       label: (<Link to={"/game3"}>Game 3</Link>),
//       key: 'game3',
//       icon: <XOutlined />,
//   },
//   {
//       label: (<Link to={"/game4"}>Game 4</Link>),
//       key: 'game4',
//       icon: <XOutlined />,
//   }]
//   const rightMenuItems : MenuItemGame[] = [
//   {
//     label: (<Link to={"/game5"}>Game 5</Link>),
//     key: 'game5',
//     icon: <XOutlined />,
// }]

//     const itemsGame: MenuItemGame[] = [
//       ...leftMenuItems,
//         {
//           type: "divider",
//           style: { flexGrow: 1, order: leftMenuItems.length },
//         },
//         ...rightMenuItems,
      
//     ];

//     const onClickMenuGames: MenuProps['onClick'] = (e) => {
//         console.log('click ', e);
//         setCurrentMenuGames(e.key);
//         setCurrentMenuAdminAndUser('');
//     };

//     const onClickMenuAdminAndUser: MenuProps['onClick'] = (e) => {
//         console.log('click ', e);
//         setCurrentMenuAdminAndUser(e.key);
//         setCurrentMenuGames('');
//     };


//     const centerStyle = {
//       position: 'relative',
//       display: 'flex',
//       justifyContent: 'center',
//     }
//     const rightStyle = {position: 'absolute', top: 0, right: 0}
    

//     return (
//       <div>
//       <Menu 
//           theme="dark"
//           mode="horizontal"
//           items={itemsGame}
//           style={{ flex: 1, minWidth: 0 }}
//       />
      
    


//  {/* <Header>
//       <Row justify="space-between">
//         <Col>
//           <Menu
//             mode="horizontal"
//             defaultSelectedKeys={['1']}
//           >
//             <Menu.Item key="1" icon={<HomeOutlined />}>
//               Home
//             </Menu.Item>
//           </Menu>
//         </Col>
//         <Col>
//           <Avatar icon={<UserOutlined />} />
//         </Col>
//       </Row>
//     </Header>


// <Menu mode="horizontal" style={{justifyContent:"flex-end"}}>
//   <Menu.Item key="1" icon={<HomeOutlined />}>
//       Home
//   </Menu.Item>
//   <Menu.Item key="2" icon={<UserOutlined />}>
//       Edit
//   </Menu.Item>
// </Menu> */}


//         </div>
//     )
// }

// export default NavigateMenu;