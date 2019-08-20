import React from "react";

const ProjectCard = ({ image, logo, name, summary }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={logo} alt="Placeholder image" className="is-rounded" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">{summary}</div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Support
        </a>
        <a href="#" className="card-footer-item">
          Visit website
        </a>
      </footer>
    </div>
  );
};

export default ProjectCard;
