# stack
- next js
- typescript

- Redux (state, store, reducer, action)
- React UI Tools [MUI](https://mui.com/)

<br>

<hr>

### 사이트
- [API Route 개념 정리 블로그](https://ppsu.tistory.com/67)
- [News API](https://newsapi.org/s/south-korea-news-api)
- [Fake Rest API](https://jsonplaceholder.typicode.com)
- [Movies API](https://developers.themoviedb.org/3)

### 영상
- [nomadcoders nextJS](https://nomadcoders.co/nextjs-fundamentals/lectures/3434)
- [NextJS 실습 강좌. SEO](https://www.youtube.com/watch?v=pdWQvfQBSGg&list=LL&index=2&t=1201s)

<br>

## 서버 실행(포트 지정)

```json
[package.json]
"scrips": {
 	"start" : "next start -p $PORT" 
}
```


```terminal
PORT=8000 npm start
```

<hr/>

### index.js 파일은 현재 폴더의 root를 의미


## 2번 렌더링나는 현상 (console.log  log 여러번)
Strict 모드가 활성화. 개발 모드일 경우 구성 요소를 두 번 렌더링한다. <br>

`reactStrictMode: false` 로 변경하면  2번 렌더링하지 않는다. <br>
하지만 strict 모드는 안전하지 않은 수명 주기, 레거시 API 사용 및 기타 여러 기능을 식별하는 데 도움을 준다고 하니 비활성화할 필요는 없음
```js
[next.config.js]
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

```

<hr/>


## UI Library (mui ,  styled-components 설치)
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
```

<hr/>

## Pre-rendering (프리 렌더링)
next.js에서는 각 page에 getServerSideProps, getStaticProps, getStaticPaths 를 사용해서 데이터를 가져올 수 있다.

1. `getServerSideProps (SSR)` <br>
데이터가 계속 바뀌는 페이지인 경우 사용 <br>
1-1. Return Values
 - props, netFound, redirect  3가지의 리턴 값을 가짐
 - notFound: boolean 값을 가짐.  `{ notFound : true }`가 리턴되면 해당 페이지는 404 응답과 함께 Page Not Fount 화면으로 이동
 - redirect: 해당 페이지로 접속 시, 개발자가 지정한 경로로 페이지를 리다이렉트하기 위해 사용되는 값 <br> `{ redirect: { desctination: string, permanent:boolean }`의 형태로 사용되는데, 만약 리다이렉트 시, Status Code를 변경할 필요가 있는 경우 permanent 대신 statusCode 라는 키를 사용해야한다
 
1-2. Parameter <br>
getServerSideProps는 context라는 파라미터를 받는다.

```
context: {
	params: 페이지가 Dynamic Route 를 사용한 경우 들어오는 데이터, pages/[id].tsx 라면 params 에는 id 값이 들어온다.
	req: Request 정보 (참고 https://nodejs.org/api/http.html#http_class_http_incomingmessage)
	res: Response 정보 (참고 https://nodejs.org/api/http.html#http_class_http_serverresponse)
	query: 쿼리 스트링 데이터가 담겨있다.
	preview: Preview 모드 사용 유무 (boolean)
	previewData: Preview 모드 사용시 전달된 데이터
	resolvedUrl: Request 된 URL 의 좀 더 일반화된 (간소화된?) 버전의 url
	locale: 현재 locale 정보
	locales: 지원되는 모든 locale 정보
	defaultLocale: 기본 locale 정보
}
```

[Data Fetching - getServerSideProps](https://woobiblog.com/Javascript/Nextjs_Data_Fetching_getServerSideProps)

2. `getStaticProps, getStaticPaths (SSG)` <br>
html이 빌드 타임에 생성된다. 빌드할때 데이터를 가져와서 html을 생성 후, 사용자의 요청이 들어올 때마다 빌드된 html을 사용 <br>
아무래도 미리 html 파일을 만들어놓고 요청 시에 보여주기 때문에 성능적으로 빠르다. <br>
하지만 데이터가 계속 바뀌어야하는 페이지에서는 SSR을 사용 <br>

다이나믹 라우팅을 사용하여 정적 페이지를 만들 경우에는 getStaticPaths 와 함께 써줘야한다.

```javascript
/*
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

export const getStaticProps = async () => {
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
};


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
```


# todo
react component를 리턴하지않는 파일은 pages 경로 안에 둘 수 없다
