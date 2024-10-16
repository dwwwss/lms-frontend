const initialState = {
  roleId: null,
  token: null,
  userId: null,
  userName: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_ROLE_ID':
      return {
        ...state,
        roleId: action.payload,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    case 'RESET_STORE':
      return {
        state: initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
