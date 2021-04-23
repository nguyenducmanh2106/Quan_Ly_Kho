import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
const UserContext = React.createContext({})
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext