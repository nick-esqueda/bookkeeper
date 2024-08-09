import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleHalfStroke,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

export const readStatusTextMap = {
  READ: "READ",
  UNREAD: "UNREAD",
  DID_NOT_FINISH: "DNF",
};

export const readStatusButtonColorMap = {
  READ: "success",
  UNREAD: "danger",
  DID_NOT_FINISH: "warning",
};

export const readStatusIconMap = {
  READ: faCircleCheck,
  UNREAD: faCircleNotch,
  DID_NOT_FINISH: faCircleHalfStroke,
};
