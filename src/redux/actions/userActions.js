export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });
  
export const setRoleId = (roleId) => ({
    type: 'SET_ROLE_ID',
    payload: roleId,
});

export const setUserId = (userId) => ({
    type: 'SET_USER_ID',
    payload: userId,
});
export const setUserName = (userName) => ({
    type: 'SET_USER_NAME',
    payload: userName,
});

export const resetStore = () => ({
    type: 'RESET_STORE',
});