import React, { Component } from 'react';
import { FormButtonLabelStyled, FormButtonStyled, FormInputStyled, FormStyled, SearchbarStyled } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarStyled>
        <FormStyled onSubmit={this.handleSubmit}>
          <FormButtonStyled type="submit">
            <FormButtonLabelStyled>Search</FormButtonLabelStyled>
          </FormButtonStyled>

          <FormInputStyled
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </FormStyled>
      </SearchbarStyled>
    );
  }
}
