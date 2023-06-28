import { ButtonStyled } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonStyled type="button" onClick={onLoadMore}>
      Load More
    </ButtonStyled>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};