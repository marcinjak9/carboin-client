import styled from "styled-components";
import Slider from "rc-slider";

export const Section = styled.section`
  @media (max-width: 768px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

export const Graphics = styled.div`
  margin-top: 4rem !important;
  margin-bottom: 4rem !important;
  svg {
    height: ${props => (props.size ? 100 + props.size / 2 + "px" : "150px")};
    width: ${props => (props.size ? 100 + props.size / 2 + "px" : "150px")};
  }
  h3 {
    font-weight: 700;
    margin-top: 1rem;
  }
  h4 {
    font-weight: 700;
  }
`;

export const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    font-size: 2rem;
    margin: 0 1rem;
    font-weight: 700;
  }

  .button {
    font-weight: 700;
    height: 40px;
    width: 40px;
  }
`;

export const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    height: 10px;
  }
  .rc-slider-track {
    height: 10px;
    background-color: #94c53e;
  }

  .rc-slider-step {
    height: 10px;
  }

  .rc-slider-handle {
    border: solid 5px #94c53e;
    width: 24px;
    height: 24px;
    margin-top: -7px;
    &:active,
    &:hover,
    &:focus {
      border-color: #94c53e;
      box-shadow: 0 0 0 5px #c3ea7d;
    }
  }
`;

export const Recap = styled.div`
  padding: 2rem;
  background-color: #115757;
  color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  h3 {
    font-weight: 700;
    color: #fff;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    p {
      margin-bottom: 20px;
    }
  }
`;
