import styled from "@emotion/styled";

export const Container = styled.div`
  .cluster-marker {
    color: #fff;
    background: #1978c8;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .crime-marker {
    background: none;
    border: none;
  }

  .crime-marker img {
    width: 25px;
  }

  .select {
    position: absolute;
    margin: 15px 15px;
    padding: 0;
    z-index: 10;
  }
`;
