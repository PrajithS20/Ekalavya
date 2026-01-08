import { Outlet, useNavigate } from "react-router-dom";
import SportsSidebar from "../components/SportsSidebar";

export default function SportsLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex h-screen w-full relative overflow-hidden bg-black text-white">
            {/* Global Background Layer */}
            <div className="fixed inset-0 z-0">
                {/* The Image */}
                <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat opacity-50" />
                {/* The Dimming Overlay - Darker for sports feel */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 flex h-full w-full">
                <SportsSidebar onLogout={handleLogout} />
                <div className="flex-1 overflow-y-auto relative p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
