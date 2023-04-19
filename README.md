This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 4/17/2023

STATE

- estado ng mind or code
- state is a variable
- si state may dalawa siyang paramaters, yung isa
  name var yung isa pang change ng name sa variable
- manual siya kada run

- unless gumawa ka ng function na
- pag variable let gagamitn
- ang kagandahan nung pag gamit ng state ay mag babago lang mag may interaction
- useEffect(), nagagamit kapag nang ti trigger ng gusto itrigger.

export def function dash(){
const [hello, setHello] = useState("haha");

    return (
        <div>
        <Title
    )

}

## forms

kapah chinange into forms
-gumagamit ng packages for forms

- package.json nakalagay kung san gusto irun
- old projects pwede mag clone ng forms then babsahin lang sa docu

1. declare function
2. export sa last

- standard declate ng pages tapos
- stop auto reset in forms js: e.preventDefault();

## formik

page -> container -> compoonent

- kapag gagawa multitple forms under components
- dapat na ka enclose yung form sa formik
- import formkik
- ang initial values pwede ng diretso
