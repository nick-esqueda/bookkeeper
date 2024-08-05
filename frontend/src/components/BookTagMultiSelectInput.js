import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookTagsAsync } from "../features/bookTags/bookTagsSlice";

const BookTagMultiSelectInput = ({ valueIds, setFormData }) => {
  const dispatch = useDispatch();

  const bookTags = useSelector((state) => state.bookTags.entities);
  const bookTagIds = useSelector((state) => state.bookTags.ids);
  const bookTagsLoading = useSelector((state) => state.bookTags.loading);
  const bookTagsError = useSelector((state) => state.bookTags.error);

  useEffect(() => {
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  const handleOnChange = (bookTags) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bookTagIds: bookTags.map((bookTag) => bookTag.value),
    }));
  };

  const convertIdsToOptions = (ids) =>
    ids.map((id) => ({
      value: id,
      label: bookTags[id].name,
    }));

  if (bookTagsLoading || !bookTagIds.length) {
    return <p>loading...</p>;
  }

  return (
    <Select
      isMulti
      name="bookTagIds"
      options={convertIdsToOptions(bookTagIds)}
      value={convertIdsToOptions(valueIds)}
      onChange={handleOnChange}
    />
  );
};

export default BookTagMultiSelectInput;
