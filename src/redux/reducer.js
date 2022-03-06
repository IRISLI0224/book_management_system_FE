const INITIAL_STATE = {
	BorrowedBooks: [],
	InStockBooks: [],
	AllBooks:[],
	AllUsers:[]
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.content,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};



  