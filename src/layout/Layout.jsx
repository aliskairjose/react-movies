// import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen max-w-[1280px] mx-auto">
        <Search />
        {children}
      </main>
      <Footer />
    </>
  );
}
