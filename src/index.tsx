import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // استيراد ملف التنسيقات الرئيسي
import App from './App'; // استيراد المكون الرئيسي للتطبيق
import reportWebVitals from './reportWebVitals';

// استيراد تنسيقات Leaflet هنا
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// إذا كنت ترغب في قياس أداء التطبيق
reportWebVitals();