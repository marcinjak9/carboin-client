import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 6px;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 1rem;

  .header {
    padding: 1rem;
    display: flex;
    background-color: #f2f2f2;
    justify-content: space-between;
    width: 100%;

    .left {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: .5rem;
    }
  }
  .title-name {
    font-size: 1rem;
    font-weight: 700;
  }

  .body {
    padding: 1rem;
  }
`

export default Card;