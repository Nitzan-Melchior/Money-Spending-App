import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Add from './views/Add.jsx';
import Delete from './views/Delete.jsx';
import MainDisplay from './views/MainDisplay.jsx';
import SpendList from './views/SpendList.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import CategoryList from './views/CategoryList.jsx';
import logo from './logo_circular_final.svg';
import UpdatedSearch from './views/UpdatedSearch.jsx';
// import Search from './views/Search.jsx';


const App = () => {

  useEffect(() => {
    document.title = "Expense Manager";
  }, []);

  const WithNav = () => (
    <>
      <NavigationBar />
      <div className='mt-4'><Outlet/></div>
      
    </>
  );

  const WithoutNav = () => (
    <>
      <header className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="mb-0">Expense Manager</h2>
          <h5 className="mb-0">Your Money, Your Control!</h5>
        </div>
        <img className='ms-2' src={logo} alt='Logo' style={{ height: '70px' }}/>
      </header>
      <hr className="w-100 my-3" />
      <div className='mt-2'><Outlet/></div>
    </>
  );

  const router = createBrowserRouter([
    {element: <WithNav />, children: [
      {path:'/add',element: <Add />},
      {path: '/delete',element: <Delete />},
      {path: '/search',element: <UpdatedSearch />}, // Search instead of updatedSearch
      {path: '/track', element: <SpendList />}
    ]},
    {element: <WithoutNav />, children: [
      {path: '/',element: <MainDisplay />,},
      {path: '/categorysearch', element: <CategoryList />}
    ]}
  ]);

  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App