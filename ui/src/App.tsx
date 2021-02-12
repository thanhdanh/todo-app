import React from 'react';
import { EuiPage, EuiPageBody, EuiPageContent } from '@elastic/eui';
import './App.css';
import Todos from './components/todos';

function App() {
  return (
    <EuiPage>
      <EuiPageBody component="div">
      <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize='m' color='transparent' hasShadow={false}>
        <Todos />
      </EuiPageContent>
    </EuiPageBody>
    </EuiPage>
  );
}

export default App;
