// // recipesSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type Comic = {
//     month: string;
//     num: number;
//     link: string;
//     year: string;
//     news: string;
//     safe_title: string;
//     transcript: string;
//     alt: string;
//     img: string;
//     title: string;
//     day: string;
// };

// interface ComicState {
//     comic: Comic;
// }

// const initialState: ComicState = {
//     comic: {
//         month: "",
//         num: 0,
//         link: "",
//         year: "",
//         news: "",
//         safe_title: "",
//         transcript: "",
//         alt: "",
//         img: "",
//         title: "",
//         day: "",
//     },
// };

// export const comicSlice = createSlice({
//     name: "comic",
//     initialState,
//     reducers: {
//         addComic: (state, action: PayloadAction<Comic>) => {
//             state.comic = action.payload
//     },
// },
// });

// export const { addComic } = comicSlice.actions;

// export default comicSlice.reducer;
