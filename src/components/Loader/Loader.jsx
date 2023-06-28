import { RotatingTriangles } from "react-loader-spinner";
import { LoaderStyled } from "./Loader.styled";
import PropTypes from 'prop-types';

export const Loader = () => {
  return (
    <LoaderStyled>
      <RotatingTriangles type="TailSpin" color="#000000" height={200} width={200} />
    </LoaderStyled>
  );
};


Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
