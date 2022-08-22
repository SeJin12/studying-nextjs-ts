import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import test from "./test";
import counter from "./counter";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE: //todo 추후 어떤 역할 하는지 확인 필요
      return action.payload;

    default:
      return combineReducers({ test, counter })(state, action);
  }
};

export default rootReducer;

// 루트 리듀서의 반환 값을 유추해줍니다. 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;