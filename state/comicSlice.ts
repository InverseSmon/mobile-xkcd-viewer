import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Comic = {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
};

interface ComicState {
    comic: Comic | null;
    latestComic: number;
}

const initialState: ComicState = {
    comic: null,
    latestComic: 0,
};

export const comicSlice = createSlice({
    name: "comic",
    initialState,
    reducers: {
        addComic: (state, action: PayloadAction<Comic>) => {
            state.comic = action.payload;
        },
        setLatestComic: (state, action: PayloadAction<number>) => {
            state.latestComic = action.payload;
        },
    },
});

export const { addComic, setLatestComic } = comicSlice.actions;

export default comicSlice.reducer;
