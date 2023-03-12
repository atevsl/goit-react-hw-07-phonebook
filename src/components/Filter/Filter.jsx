import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from '../../redux/features/filterSlice';
import { LabelStyled, InputStyled } from '../ContactForm/ContactForm.Styled';
import { SpanStyled } from './Filter.styled';

const Filter = () => {
  const dispath = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <LabelStyled>
      <SpanStyled>Find contacts by name:</SpanStyled>
      <InputStyled
        name="filter"
        value={filter}
        onChange={e => {
          dispath(setFilter(e.currentTarget.value));
        }}
      ></InputStyled>
    </LabelStyled>
  );
};

export default Filter;
