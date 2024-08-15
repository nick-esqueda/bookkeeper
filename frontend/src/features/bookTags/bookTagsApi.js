export const fetchBookTags = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/book-tags`);

  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error("Failed to fetch book tags");
  }
  return response.json();
};

export const fetchBookTag = async (bookTagId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-tags/${bookTagId}`
  );
  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error(`Failed to fetch book tag: #${bookTagId}`);
  }
  return response.json();
};

export const createBookTag = async (bookTag) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/book-tags`, {
    method: "POST",
    body: JSON.stringify(bookTag),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from createBookTag(): ", errorResponse);
    throw new Error("Failed to create book tag");
  }

  return response.json();
};

export const editBookTag = async (bookTag) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-tags/${bookTag.id}`,
    {
      method: "PUT",
      body: JSON.stringify(bookTag),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from editBookTag(): ", errorResponse);
    throw new Error("Failed to edit book tag");
  }

  return response.json();
};

export const deleteBookTag = async (bookTagId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-tags/${bookTagId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from deleteBookTag(): ", errorResponse);
    throw new Error("Failed to delete book tag");
  }
};
