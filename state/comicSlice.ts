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
    zoom: boolean;
}

const initialState: ComicState = {
    comic: null,
    latestComic: 0,
    zoom: false,
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
        toggleZoom: (state) => {
            state.zoom = !state.zoom;
        },
        setZoomFalse: (state) => {
            state.zoom = false;
        },
    },
});

export const { addComic, setLatestComic, toggleZoom, setZoomFalse } =
    comicSlice.actions;

export default comicSlice.reducer;
