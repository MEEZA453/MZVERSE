import { AnyAction } from "redux";

interface Notification {
  _id: string;
  sender: { _id: string; handle: string; profile?: string };
  recipient: string;
  post?: { _id: string; name: string; images: string[] };
  type: "vote" | "follow" | "comment";
  message: string;
  image?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  loading: boolean;
  items: Notification[];
  error: string | null;
}

const initialState: NotificationState = {
  loading: false,
  items: [],
  error: null,
};

const notification = (state = initialState, action: AnyAction): NotificationState => {
  switch (action.type) {
    case "NOTIFICATION_REQUEST":
      return { ...state, loading: true, error: null };

    case "NOTIFICATION_SUCCESS":
      return { ...state, loading: false, items: action.payload };

    case "MARK_ALL_READ":
      return {
        ...state,
        items: state.items.map((n) => ({ ...n, isRead: true })),
      };

    case "MARK_ONE_READ":
      return {
        ...state,
        items: state.items.map((n) =>
          n._id === action.payload ? { ...n, isRead: true } : n
        ),
      };

    case "DELETE_NOTIFICATION":
      return {
        ...state,
        items: state.items.filter((n) => n._id !== action.payload),
      };

    case "NOTIFICATION_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default notification;
