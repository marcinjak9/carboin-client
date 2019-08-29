import React from "react";
import { Link } from "react-router-dom";
const Hero = ({ title, subtitle, cta }) => {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
          {cta && (
            <Link
              to={cta.url}
              className="button is-primary is-inverted is-medium"
            >
              {cta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
