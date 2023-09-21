import { configureStore } from "@reduxjs/toolkit";
import { allMangaReducer } from "./src/reducers/allMangaReducer";
import { chapterImgSliceReducer } from "./src/reducers/chapterImgReducer";
import { allChapLinksReducer } from "./src/reducers/allChapLinks";
import { lightReducer } from "./src/reducers/lightMode";

export const store = configureStore({
  reducer: {
    allManga: allMangaReducer,
    allChapLinks: allChapLinksReducer,
    chapterImg: chapterImgSliceReducer,
    light: lightReducer,
  },
});
