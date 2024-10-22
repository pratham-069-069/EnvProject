// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Component from "./assets/Component";
// import WastePricing from "./assets/WastePricing";

// export default function App() {
//   return (
//     <Router>
//       <div>
//         {/* Define routes */}
//         <Routes>
//           {/* Route for Component */}
//           <Route path="/" element={<Component />} />
//           {/* Route for WastePricing */}
//           <Route path="/wastepricing" element={<WastePricing />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./assets/AboutUs.jsx";
import WastePricing from "./assets/WastePricing.jsx"
import Component from "./assets/Component.jsx"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/component" element={<Component />} />
          <Route path="/wastepricing" element={<WastePricing />} />
        </Routes>
      </div>
    </Router>
  );
}