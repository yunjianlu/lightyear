import Nav from "./components/nav";
import LandingBody from "./components/mainBody";
import Footer from "./components/footer";
import SideFilterBar from "./components/SideFilterBar";
import Layout from "./components/Layout";
//const assert = require('assert');

// This is the main entry point for the Lightyear application
// It sets up the main layout with a navigation bar, side filter bar, main content area
// and footer, ensuring a responsive design that adapts to different screen sizes.

// min-h-screen: ensures the page takes at least the full viewport height
// flex flex-col: lays out children vertically (column direction)
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[url(/images/about/largerNightSky_pic.png)]">
      {/* pt-20 offsets for fixed navbar height */}
      {/* Main vertical layout container */}
      <Layout>
      {/* Main content area: flex row for sidebar and main content */}
        <div className="flex w-full mt-12 md:mt-0">
          {/* Sidebar container: holds the filter bar, takes 1/4 or 1/5 width on md/lg */}
          <div className=" md:w-1/4 lg:w-1/5 bg-white">
            <SideFilterBar />
          </div>
          {/* Main content container: holds the landing body, takes remaining width */}
          <div className="w-full md:w-3/4 lg:w-4/5 bg-[url(/images/about/largerNightSky_pic.png)]">
            <LandingBody />
          </div>
        </div>
        <div id="footerDiv">
          <Footer />
        </div>
    </Layout>
    </div>
  );
}