//Store action types in var
export const SET_DOCUMENTARIES = 'SET_DOCUMENTARIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

//Action creators 
export function setDocumentaries(value) {
  return {
    type: SET_DOCUMENTARIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}


export function addFavorite(value) {
  return { type: ADD_FAVORITE, value };
}

export function removeFavorite(value) {
  return { type: REMOVE_FAVORITE, value };
}
