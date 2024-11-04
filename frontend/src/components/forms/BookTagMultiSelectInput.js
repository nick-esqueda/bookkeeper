import React from "react";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { createBookTagAsync } from "../../features/bookTags/bookTagsSlice";

const BookTagMultiSelectInput = ({ valueIds, setFormData }) => {
  const dispatch = useDispatch();

  const {
    ids: bookTagIds,
    entities: bookTags,
    loading: bookTagsLoading,
    error: bookTagsError,
  } = useSelector((state) => state.bookTags);

  const handleOnChange = (bookTags) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bookTagIds: bookTags.map((bookTag) => bookTag.value),
    }));
  };

  const createBookTag = async (name) => {
    try {
      const createdBookTag = await dispatch(createBookTagAsync({ name }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        bookTagIds: [...prevFormData.bookTagIds, createdBookTag.id],
      }));
    } catch (error) {
      console.error(error);
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  const convertIdsToOptions = (ids) =>
    ids.map((id) => ({
      value: id,
      label: bookTags[id]?.name,
    }));

  if (bookTagsError) {
    return <p>Error: {bookTagsError}</p>;
  }

  return (
    <CreatableSelect
      isMulti
      name="bookTagIds"
      options={convertIdsToOptions(bookTagIds)}
      value={convertIdsToOptions(valueIds)}
      onChange={handleOnChange}
      isDisabled={bookTagsLoading}
      isLoading={bookTagsLoading}
      onCreateOption={createBookTag}
      isClearable
    />
  );
};

export default BookTagMultiSelectInput;
