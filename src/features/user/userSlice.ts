import {createAppSlice} from "../../app/createAppSlice";
import {fetchRandomNumber} from "./userSliceAPI";

export type userSliceState = {
  name: string;
  number: number;
  status: "idle" | "loading" | "failed";
}

const initialState: userSliceState = {
  name: "",
  number: 0,
  status: "idle",
}
export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setName: create.reducer((state, action) => {
      state.name = action.payload as any;
    }),
    setNumber: create.reducer((state, action) => {
      state.number = action.payload as any;
    }),
    fetchUser: create.asyncThunk(
      async (name: string) => {
        const response = await fetchRandomNumber(name)
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.number = action.payload.number
          state.name = action.payload.name
          state.status = "idle"
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectUser: user => user.name,
    selectNumber: user => user.number,
    selectStatus: user => user.status,
  },
})

export const {selectUser, selectNumber, selectStatus} = userSlice.selectors;
export const {setName, fetchUser} = userSlice.actions;
