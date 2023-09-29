// import PropTypes from "prop-types";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <header className="">header</header>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

// Layout.propTypes = {
//   children: PropTypes.any,
// };
