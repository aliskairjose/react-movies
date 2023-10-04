// import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Search />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
