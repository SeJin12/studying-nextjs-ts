import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type Movie = {
  adult: boolean;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// getServerSideProps 에서 return 값을 받아 사용
const Home: NextPage = () => {
  // const [movies, setMovies] = useState<Movie[] | undefined>(undefined);

  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (
  //       await fetch(
  //         `https://api.themoviedb.org/3/movie/popular?api_key=50b189ad76cde27970ce35179200ec5d`
  //       )
  //     ).json();
  //     setMovies(results);
  //   })();
  // }, []);

  return (
    <div className={styles.container}>
      <h1>Next JS</h1>
      <ul>
        {/* {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <div>
                {movie.title} ({movie.original_title})
              </div>
              release: <span>{movie.release_date}</span>
            </li>
          ))} */}
      </ul>
      <style jsx>
        {`
          ul {
            list-style: none;
            background: #ffffff;
          }
          li {
            margin-right: 1rem;
            color: rgb(0, 0, 0);
            margin: 10px;
          }
        `}
      </style>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const data = await (await fetch(`https://api.themoviedb.org/movie/popular?api_key=50b189ad76cde27970ce35179200ec5d`)).json();
//     const {production_companies} = data;
//   // data 없을 땐 리턴값을 달리함
//   if (!data) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   //pageProps로 넘길 데이터
//   return {
//     props: {
//       data: {
//         data,
//       },
//     },
//   };
// };

export default Home;
