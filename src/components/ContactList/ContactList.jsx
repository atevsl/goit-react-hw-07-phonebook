import React, { useEffect } from 'react';
import {
  ListStyled,
  ListItemStyled,
  ContactTextStyled,
  ContactListHeader,
  ContactListBtn,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContactList,
  selectContactList,
  selectError,
  selectIsLoading,
} from '../../redux/features/contactListSlice';
import { selectFilter } from '../../redux/features/filterSlice';
import Loader from 'components/Loader/Loader';

const ContactList = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(selectContactList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContactList());
  }, [dispatch]);

  const filteredContacts = contactList?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      {isLoading && <Loader />}
      {error && 'Sorry, something wrong, please try to reload page.'}
      {contactList.length > 0 && !isLoading && !error && (
        <>
          <ContactListHeader>Contacts:</ContactListHeader>
          <ListStyled>
            {filteredContacts.map(contact => {
              return (
                <ListItemStyled key={contact.id}>
                  <ContactTextStyled>
                    {contact.name}: {contact.phone}
                  </ContactTextStyled>
                  <ContactListBtn
                    type="button"
                    onClick={() => dispatch(deleteContact(contact.id))}
                  >
                    Delete
                  </ContactListBtn>
                </ListItemStyled>
              );
            })}
            {filteredContacts.length === 0 &&
              'Sorry, there is no such contact...'}
          </ListStyled>
        </>
      )}
    </>
  );
};

export default ContactList;
