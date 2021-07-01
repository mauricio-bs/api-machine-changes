import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

//Login
import Login from './pages'

//Admin
import Dashboard from './pages/admin/dashboard'
import UserList from './pages/admin/users'
import NewUser from './pages/admin/users/newUser'
import EditUser from './pages/admin/users/editUser'

//Users
import Home from './pages/client/home'

//Components 

//Machines

//------------------------------------------------
export default function routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Login Page */}
                <Route path='/' exact component={Login}/>
                {/* Admin */}
                <Route path='/admin' exact component={Dashboard}/>
                <Route path='/admin/users/all-users' exact component={UserList}/>
                <Route path='/admin/users/register' exact component={NewUser}/>
                <Route path='/admin/users/edit/:_id' exact component={EditUser}/>
                {/* Machines */}
                
                {/* Components */}
                
                {/* User */}
                <Route path='/home' exact component={Home}/>


            </Switch>
        </BrowserRouter>
    )
}