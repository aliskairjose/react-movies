// import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Header from "../components/header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

// Layout.propTypes = {
//   children: PropTypes.any,
// };
