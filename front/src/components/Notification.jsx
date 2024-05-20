import React from 'react';
import styled from 'styled-components';
// import { showNotification } from '../Store/notificationSlice';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  z-index: 9999;
`;

function Notification({ message }) {
  return <NotificationContainer>{message}</NotificationContainer>;
}

export default Notification;
