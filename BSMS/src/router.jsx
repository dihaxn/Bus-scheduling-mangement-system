import { createBrowserRouter } from "react-router-dom";
import Booking from "./Pages/Booking.jsx";
import Map from "./Pages/Map.jsx";
import Home from "./Pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'booking',
        element: <Booking />,
    },
    {
        path: 'map',
        element: <Map />,
    }
]);

export default router;
