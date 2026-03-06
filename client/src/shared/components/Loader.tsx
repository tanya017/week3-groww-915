// const Loader = ({ size = 40, color = '#3498db', speed = '0.8s' }) => {
//   // Inline styles for the spinner container
//   const loaderStyle = {
//     width: size,
//     height: size,
//     border: `${size / 8}px solid #f3f3f3`, // Light grey background
//     borderTop: `${size / 8}px solid ${color}`, // Blue foreground
//     borderRadius: '50%',
//     display: 'inline-block',
//     animation: `spin ${speed} linear infinite`,
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//       <div style={loaderStyle} />
//     </div>
//   );
// };

// export default Loader;

// import usePreAuthHandshak from '@/services/apis/usePreAuthHandshak';
// import React from 'react';

// const Loader = ({ size = 48, color = "#3498db" }) => {
//   const containerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%", // Takes full height of the <main> tag
//     background: "var(--bg-void)", // Matches your app background
//   };

//   const spinnerStyle = {
//     width: size,
//     height: size,
//     border: `4px solid rgba(255, 255, 255, 0.1)`,
//     borderTop: `4px solid ${color}`,
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   };
// usePreAuthHandshak();
//   return (

//     <div style={containerStyle}>

//       <style>
//         {`@keyframes spin { to { transform: rotate(360deg); } }`}
//       </style>
//       <div style={spinnerStyle} />
//     </div>
//   );
// };

// export default Loader;

// Loader.tsx
import usePreAuthHandshak from "@/services/apis/usePreAuthHandshak";
import { useUIStore } from "@/store/ui.store"; // Import your store
import React, { useState } from "react";

const Loader = ({ size = 48, color = "#3498db" }) => {
  // Assuming your store has a function like setActiveTab
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const [error, setError] = useState<string | null>(null);

  // Trigger the handshake and redirect on success
  usePreAuthHandshak(
    () => {
      // SUCCESS: Only now do we move to login
      setActiveTab("login");
    },
    (err) => {
      // FAILURE: Stay here and show the error
      setError("Connection failed. Please check CORS or Network.");
    },
  );

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "var(--bg-void)",
  };

  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid rgba(255, 255, 255, 0.1)`,
    borderTop: `4px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={spinnerStyle} />
      <p style={{ color: "white", marginTop: "10px" }}>
        Initializing Session...
      </p>
    </div>
  );
};

export default Loader;
