import React from 'react';
import { Calendar } from '../Calendar/Calendar';
import { NewMeeting } from '../NewMeeting/NewMeeting';

import { Provider } from 'react-redux';
import { store } from '../store/store';


import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { EditMeeting } from '../EditMeeting/EditMeeting';


export const App = () => {

  return (
    <Provider store={store}>
      <div className="app">

        <BrowserRouter>
            <Route path="/" component={Calendar} exact /> 
      
            <Route path="/newmeetingform" component={NewMeeting} />

            <Route path="/editform/:id" component={EditMeeting} />
        </BrowserRouter>

      </div>
    </Provider>
  );
};