import { lazy } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import {
  Home,
  MangaDetail,
  Navbar,
  MangaChapter,
  MostViewed,
  SubHeader,
  Login,
  MangaType,
  Footer,
} from "./component";
import { Routes, Route } from "react-router-dom";
import { fetchManga } from "../apiCall";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allMangaAdd } from "./reducers/allMangaReducer";
import "./styles/appBodyCss/appBodyCss.css";
import LatestManga from "./component/latest/LatestManga";
import Searched from "./component/seached/Searched";

// lazy imports
const CreateManga = lazy(() => import("./component/upload/CreateManga"));
// const Login = lazy(() => import("./component/upload/Login"));
const AddCreateManga = lazy(() =>
  import("./component/advanceUpload/AddCreateManga")
);
const RUDOpp = lazy(() => import("./component/rudopp/RUDOpp"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manga = await fetchManga();
        if (manga || manga.length > 0) {
          if (manga.data.result) {
            dispatch(allMangaAdd(manga.data.result));
          } else if (manga.data.error) {
            console.log(manga.data.error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className='appBodyContainer'>
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <SubHeader />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/mostViewed' element={<MostViewed />} />
          <Route exact path='/latest' element={<LatestManga />} />
          <Route exact path='/mangaType/:type' element={<MangaType />} />
          <Route exact path='/searched' element={<Searched />} />
          <Route exact path='/manga/:id' element={<MangaDetail />} />
          <Route exact path='/manga/:id/:chapter' element={<MangaChapter />} />
          <Route exact path='/createManga' element={<CreateManga />} />
          <Route exact path='/repostDelete' element={<RUDOpp />} />
          <Route exact path='/AddCreateManga' element={<AddCreateManga />} />
          <Route path='/login' element={<Login />}></Route>
        </Routes>
        <Footer />
      </SkeletonTheme>
    </div>
  );
};

export default App;
