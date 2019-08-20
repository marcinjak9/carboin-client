import React from "react";
import Hero from "Components/Hero";
import Container from "Components/Container";
import ProjectCard from "../Components/ProjectCard";

const Projects = () => {
  return (
    <>
      <Hero
        title="The projects that we are supporting ❤️"
        subtitle="Here you can find all of reforestation projects"
      />
      <div className="section">
        <Container>
          <div className="columns">
            <div className="column is-one-third">
              <ProjectCard
                image="https://bulma.io/images/placeholders/1280x960.png"
                logo="https://bulma.io/images/placeholders/96x96.png"
                name="Marocco regeneration"
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                iaculis mauris."
              />
            </div>
            <div className="column is-one-third">
              <ProjectCard
                image="https://bulma.io/images/placeholders/1280x960.png"
                logo="https://bulma.io/images/placeholders/96x96.png"
                name="Marocco regeneration"
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                iaculis mauris."
              />
            </div>
            <div className="column is-one-third">
              <ProjectCard
                image="https://bulma.io/images/placeholders/1280x960.png"
                logo="https://bulma.io/images/placeholders/96x96.png"
                name="Marocco regeneration"
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                iaculis mauris."
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Projects;
