// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Building2, Users, UserPlus, PanelLeft } from 'lucide-react';
// import './Sidebar.css';

// const Sidebar: React.FC = () => {
//   const [collapsed, setCollapsed] = React.useState(false);
  
//   return (
//     <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <div className="sidebar-header">
//         <div className="logo">
//           <Building2 size={24} />
//           {!collapsed && <span>GreatHire</span>}
//         </div>
//         <button 
//           className="collapse-btn" 
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <PanelLeft size={20} />
//         </button>
//       </div>
      
//       <nav className="sidebar-nav">
//         {/* <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>
//           <Users size={20} />
//           {!collapsed && <span>Dashboard</span>}
//         </NavLink> */}
//         {/* <NavLink to="/add-intern" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}> */}
//           {/* <UserPlus size={20} /> */}
//           {/* {!collapsed && <span>Add Intern</span>} */}
//         {/* </NavLink> */}
//         {/* <NavLink to="/add-employee" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
//           <UserPlus size={20} />
//           {!collapsed && <span>Add Employee</span>}
//         </NavLink> */}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar