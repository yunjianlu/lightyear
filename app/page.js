import Nav from "./components/nav";
import LandingBody from "./components/mainBody";
import Footer from "./components/footer";
import SideFilterBar from "./components/SideFilterBar";

// Main Page component: Entry point for Lightyear app
// Sets up the main layout with navigation, filter sidebar, main content, and footer
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[url(/images/about/largerNightSky_pic.png)]">
      {/* Navigation bar at the top */}
      <Nav />
      {/* Main content area: flex row for sidebar and main content */}
      <div className="flex w-full mt-30 md:mt-12 min-h-screen">
        {/* Sidebar container: holds the filter bar, takes 1/4 or 1/5 width on md/lg */}
        <div className="md:w-1/4 lg:w-1/5 bg-white">
          <SideFilterBar />
        </div>
        {/* Main content container: holds the landing body, takes remaining width */}
        <div className="w-full md:w-3/4 lg:w-4/5 bg-[url(/images/about/largerNightSky_pic.png)]">
            <LandingBody />
        </div>
      </div>
      {/* Footer at the bottom */}
      <div id="footerDiv">
        <Footer />
      </div>
    </div>
  );
}
