// Action Types
const TEST = "TEST";

// Action Creators
export const testAction = (text:string) => ({ type: TEST, text });

// Initial State
const initialState:string[] = [];

// Reducer
const test = (state = initialState, action:any) => {
  switch (action.type) {
    case TEST:
      return [...state, action.text];
    default:
      return state;
  }
};


export default test;