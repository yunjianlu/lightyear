import Nav from "./nav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <div id="headerDiv">
        <Nav />
      </div>
      <div id="bodyDiv" className="bg-red-800">
        {children}
      </div>
      <div id="footerDiv" className="p-4">
        footer
      </div>
    </div>
  );
}