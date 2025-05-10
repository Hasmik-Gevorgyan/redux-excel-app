import {createAppSlice} from "../../app/createAppSlice";
import {fetchRandomNumber, fetchAllColors, fetchSelectedColor} from "./userSliceAPI";

export type userSliceState = {
  name: string;
  color: string;
  fetchUserStatus: "idle" | "loading" | "failed";
  fetchColorsStatus: "idle" | "loading" | "failed";
  deleteSelectedColorStatus:  "idle" | "loading" | "failed";
  colorsList: {color: string}[];
}

const initialState: userSliceState = {
  name: "",
  color: "",
  fetchUserStatus: "idle",
  fetchColorsStatus: "idle",
  deleteSelectedColorStatus: "idle",
  colorsList: [],
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setName: create.reducer((state, action) => {
      state.name = action.payload as any;
    }),
    setNumber: create.reducer((state, action) => {
      state.color = action.payload as any;
    }),
    fetchUser: create.asyncThunk(
      async ({name, selectedColor}: {name: string, selectedColor: string}) => {
        const response = await fetchRandomNumber(name, selectedColor);

        return response;
      },
      {
        pending: state => {
          state.fetchUserStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.color = action.payload.color
          state.name = action.payload.name
          state.fetchUserStatus = "idle"
        },
        rejected: state => {
          state.fetchUserStatus = "failed"
        },
      },
    ),
    fetchColors: create.asyncThunk(
      async () => {
        const response = await fetchAllColors();
        
        return response;
      },
      {
        pending: state => {
          state.fetchColorsStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.colorsList = action.payload
          state.fetchColorsStatus = "idle"
        },
        rejected: state => {
          state.fetchColorsStatus = "failed"
        },
      },
    ),
    deleteSelectedColor: create.asyncThunk(
      async (id: string) => {
        await fetchSelectedColor(id)
        return id;
      },
      {
        pending: state => {
          state.deleteSelectedColorStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.colorsList = state.colorsList.filter(color => color.color !== action.payload)
          state.deleteSelectedColorStatus = "idle"
        },
        rejected: state => {
          state.deleteSelectedColorStatus = "failed"
        }
      },
    ),
  }),
  selectors: {
    selectUser: user => user.name,
    selectColor: user => user.color,
    selectfetchColorsStatus: user => user.fetchColorsStatus,
    selectfetchUserStatus: user => user.fetchUserStatus,
    selectColorsList: user => user.colorsList,
  },
})

export const {selectUser, selectColor, selectfetchUserStatus, selectfetchColorsStatus, selectColorsList} = userSlice.selectors;
export const {setName, fetchUser, fetchColors, deleteSelectedColor } = userSlice.actions;
