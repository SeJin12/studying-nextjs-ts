## 서버 포트 지정
package.json - scripts - "start": "next start -p $PORT"
PORT=8000 npm start


## index.js 파일 현재 폴더이 root를 의미

## API Route 정보 사이트: https://ppsu.tistory.com/67


# 기존 프로젝트에 typescript 적용 (해당 프로젝트는 처음부터 ts로 생성한거라 안해도됨)
1. touch tsconfig.json
2. npm run dev
3. npm install --save-dev @types/react @types/node
4. npm run dev
## tsx 파일에서  node_module을 못찾는 오류있음 
tsconfig.json - exclude - node_modules 주석 처리함
/////////////////////////////

# 2번 렌더링나는 현상
Strict 모드가 활성화. 개발 모드일 경우 구성 요소를 두 번 렌더링한다.
next.config.js  reactStrictMode: true  -> false 로 변경하면  2번 렌더링하지 않는다.
하지만 strict 모드는 안전하지 않은 수명 주기, 레거시 API 사용 및 기타 여러 기능을 식별하는 데 도움을 준다고 하니 비활성화할 필요는 없음

##  tsconfig.json "resolveJsonModule": false, 원래 true임.

## element-ui 오류 나서 안함
## NextUI 설치  https://nextui.org/docs/guide/getting-started
## npm i @nextui-org/react   삭제함. 최신거라 그런지 안되는부분이있음
## mui ,  styled-components 설치
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components



*
  SSR (Server Side Rendering)
  "page가 요청받을때마다" 호출되어 pre-rendering
  pre-render가 꼭 필요한 동적 데이터가 있는 page에 사용
  매 요청마다 호출되므로 성능은  SSG 보다 뒤지지만, 내용은 언제든 동적으로 수정이 가능
*/
export const getServerSideProps = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=bf9d4ea494024b88a8840dc1886dcbc5`
  );
  const data = await res.json();
  // console.log(articles);
  return {
    props: {
      data: data,
    },
  };
};

/*
 개발 서버에서는 큰 차이 없음. 
 SSG (Static Site Generation)
 "빌드 시에 딱 한 번"만 호출되고, 바로 static file로 빌드된다. 따라서 이후 수정이 불가능하다
 앱 빌드 후에 웬만하면 바뀌지 않는 내용이 있는 경우에만 사용하면 된다
 장점은 호출 시마다 매번 data fetch 를 하지 않으니 getServerSideProps 보다 성능면에서 좋다
*/

/* export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=1&end=5`
  );
  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
    // At most once every 10 seconds
    revalidate: 10 // In seconds 
  };
}; */


/* getStaticPaths
동적 라우팅을 사용할 때, 어떤 페이지( 현재 폴더 경로에서는 id )를 미리 Static으로 빌드할지 정하는 API 
*/
export const getStaticPaths = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=1&_end=5`
  );
  const photos = await res.json();
  const ids = photos.map((photo) => photo.id);
  const paths = ids.map((id) => {
    return {
      params: { id: id.toString() },
    };
  });
  /*
      // 아래와 같은 형태로 리턴해야함. 빌드 시에 해당 페이지들을 static으로 생성함. 그리고 fallback도 리턴해야함
      return {
        paths: [
            {params: {}}
        ],
        fallback: true | false | 'blocking'
      }
      fallback (required)
      - false : getStaticPaths에서 리턴하지 않은 페이지는 모두 404로 연결
      - true : getStaticPaths에서 리턴하지 않은 페이지 접속 시, 
            1. 먼저 사용자에게 fallback 페이지를 보여줌  ( => ??? 없는데 뭘 보여줌. 다음에 검색)
            2. 서버에서 static 하게 페이지를 생성함
            3. 해당 페이지를 사용자에게 보여줌
            4. 다음부터 해당 페이지로 접속하는 사용자에게는 static한 페이지를 보여줌
            => 많은 static 페이지를 생성해야 하지만 빌드 시간이 너무 오래 걸릴 때 사용
      - 'blocking' : getStaticPaths에서 리턴하지 않은 페이지에 접속 시,
            1. 사용자에게 server side rendering한 static 페이지를 보여줌
            2. 다음부터 해당 페이지로 접속하는 사용자에게는 SSR한 static 페이지를 보여줌
            => 즉  fallback 페이지나 로딩 화면이 없다. 동적 라우팅 페이지를 static 페이지로 제공해야할 때 사용.  ( => ??? )
*/
  return {
    paths, // paths: paths 이름이 같으면 생략가능
    fallback: false,
  };
};
