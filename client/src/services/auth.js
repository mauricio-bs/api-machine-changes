export const TOKEN_KEY = '&app-token'
export const USER_ID = '&user-id'
export const USERNAME = '&username'
export const USER_ROLE = '&user-role'
export const USER_SHIFT = '&user-shift'

//Login
export const login = token => {localStorage.setItem(TOKEN_KEY, token)}

//Logout
export const logout = () => {localStorage.clear()}

//ID
export const setUserID = id => {localStorage.setItem(USER_ID, id)}
export const getUSerID = () => {localStorage.getItem(USER_ID)}

//Name
export const setUsername = id => {localStorage.setItem(USERNAME, id)}
export const getUsername = () => {localStorage.getItem(USERNAME)}

//Role
export const setUserRole = id => {localStorage.setItem(USER_ROLE, id)}
export const getUserRole = () => {localStorage.getItem(USER_ROLE)}

//Shift
export const setUserShift = id => {localStorage.setItem(USER_SHIFT, id)}
export const getUserShift = () => {localStorage.getItem(USER_SHIFT)}

//Token
export const getToken = () => {localStorage.getItem(TOKEN_KEY)}