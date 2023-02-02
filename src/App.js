import React from "react";
import { Layout } from "antd";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./AppRouter";
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Content style={{}}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Content>
  );
}

export default App;
