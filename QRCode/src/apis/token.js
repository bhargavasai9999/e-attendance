let getToken=localStorage.getItem('jwtToken');
export let token = {
  headers: {
    authorization: `Bearer ${getToken}`,
  },
};
