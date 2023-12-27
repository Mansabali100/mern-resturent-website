import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p class="col-md-4 mb-0 text-muted">© 2023 <bold>Sub-Kuch,</bold> Inc</p>

        <Link
          href="/"
          class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
