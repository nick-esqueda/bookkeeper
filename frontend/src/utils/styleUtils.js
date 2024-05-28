export const getReadStatusStyle = (readStatus) => {
  switch (readStatus) {
    case "READ": {
      return "success";
    }
    case "UNREAD": {
      return "danger";
    }
    case "DID_NOT_FINISH": {
      return "warning";
    }
    default: {
      return "";
    }
  }
}
