// App.js
import './styles/tailwind.css'; // Adjust the path if necessary
import './App.css'; // Make sure your custom styles are also imported
import React from 'react';
import WebsitePreview from './components/WnCCWebsite.js';

function App() {
  return (
    <div className="App">
      <WebsitePreview />
    </div>
  );
}

export default App;
