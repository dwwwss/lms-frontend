import React, { useState, useEffect } from 'react';
import { Button, Nav, NavItem } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import loginbrand from '../assets/images/loginImage/download.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { resetStore } from '../redux/actions/userActions';

const Sidebar = () => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState([]);
  const location = useLocation();
  const roleId = useSelector((state) => state.user.roleId);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    let updatedNavigation = [
      {
        title: 'Home',
        href: '/UserHome',
        icon: 'bi bi-house',
      },
      {
        title: 'Courses',
        href: '/UserCourses',
        icon: 'bi bi-book',
      },
      {
        title: 'Training Plan',
        href: '/UserTrainingPlan',
        icon: 'bi bi-card-text',
      },
      {
        title: "My Account",
        href: "/Profile",
        icon: "bi bi-person",
      },
    ];

    if (roleId === 2) {
      updatedNavigation = [
        {
          title: 'Home',
          href: '/AdminHome',
          icon: 'bi bi-house',
        },
        {
          title: 'Users',
          href: '/AdminViewUser',
          icon: 'bi bi-people',
        },
        {
          title: 'Role',
          href: '/AdminViewRole',
          icon: 'bi bi-person-check',
        },
        {
          title: 'Designation',
          href: '/AdminViewDesignation',
          icon: 'bi bi-box',
        },
        {
          title: 'Courses',
          href: '/AdminViewCourse',
          icon: 'bi bi-columns',
        },
        {
          title: 'Training Plans',
          href: '/AdminViewTrainingPlan',
          icon: 'bi bi-textarea-resize',
        },
        {
          title: "My Account",
          href: "/Profile",
          icon: "bi bi-person",
        },

      ];
    }
    setNavigation(updatedNavigation);
  }, [token, navigate]);

  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetStore());
    navigate('/', { replace: true });
  };

  return (
    <div className="p-3 caliber-font" style={{ height: "100%" }}>
      <div className="d-flex align-items-center">
        <img
          src={loginbrand}
          alt="cdkk`"
          style={{ height: "55px", marginLeft: "20px" }}
        />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
          id="btn-close"
        ></Button>
      </div>
      <div className="pt-4" style={{ height: "85vh" }}>
        <Nav vertical className="sidebarNav" style={{ height: "100%" }} >
          <div>
            {token && navigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
          </div>
          {
            roleId === 2 ?
              <div >
                <div className="centered">
                  <button tag="a"
                    onClick={handleLogout}
                    className="button-container primaryRed font-sm"
                    style={{ width: "100%", height: "50px" }}>Log Out</button>
                </div>
              </div>
              :
              <div style={{ marginTop: "100%" }}>
                <div className="centered">
                  <button tag="a"
                    onClick={handleLogout}
                    className="button-container primaryRed font-sm"
                    style={{ width: "100%", height: "50px" }}>Log Out</button>
                </div>
              </div>
          }
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
