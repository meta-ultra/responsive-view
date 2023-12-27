# Welcome to `@meta-ultra/responsive-view`

Inspired by autofix.js, `@meta-ultra/responsive-view` provides a pretty much preciser React based responsive solution for **Big Screen** or **Digital Cockpit**.

## 🏠 Installation

Install `@meta-ultra/responsive-view` with your favorite package manager:

- pnpm: `pnpm add @meta-ultra/responsive-view@latest`
- yarn: `yarn add @meta-ultra/responsive-view@latest`
- npm: `npm install -S @meta-ultra/responsive-view@latest`

## ✨ Usage

It's easy peasy to make **the whole components** responsive by wrapping them with `ResponsiveView.div` component.

```tsx
import { 
  ResponsiveMode, 
  ResponsiveProvider, 
  ResponsiveView, 
} from "@meta-ultra/responsive-view"

const App = () => {
  return (
    <ResponsiveProvider config={{
      draftWidth: 1920,          // the width of draft
      draftHeight: 1080,         // the height of draft
      minScale: 0.5,             // minimum scaling ratio for each axis
      mode: ResponsiveMode.FILL, // fill up the screen size completely
    }}>
      <ResponsiveView.div>{/*...the whole application*/}</ResponsiveView.div>
    </ResponsiveProvider>
  )
}
```

If you want to make **a single existing component and its children components** become responsive, `ResponsiveView` will be a great choice.

```tsx
import { 
  ResponsiveMode, 
  ResponsiveProvider, 
  ResponsiveView, 
} from "@meta-ultra/responsive-view"

const App = () => {
  return (
    <ResponsiveProvider config={{
      draftWidth: 1920,          // the width of draft
      draftHeight: 1080,         // the height of draft
      minScale: 0.5,             // minimum scaling ratio for each axis
      mode: ResponsiveMode.FILL, // fill up the screen size completely
    }}>
      <ResponsiveView>
        <div>I gonna be responsive right now :)</div>
        <div>I'm still for fixed screen size :(</div>
      </ResponsiveView>
    </ResponsiveProvider>
  )
}
```

Is there a way to responsify **a single component no impacts on its children**? There you go - `useScaledSize`.

```tsx
import { type ReactNode } from "react"
import { 
  ResponsiveMode, 
  ResponsiveProvider, 
  useScaledSize,
} from "@meta-ultra/responsive-view"

const Header = ({children}: {children: ReactNode}) => {
  // return the scaled size based on screen size and draft size of h1
  const scaledSize = useScaledSize({
    scaling: true, // update state when resize event of window fires
    width: 600,    // the draft width of h1
    height: 100,   // the draft height of h1
  })
  return <h1 style={scaledSize}>{children}</h1>
}

const App = () => {
  return (
    <ResponsiveProvider config={{
      draftWidth: 1920,          // the width of draft
      draftHeight: 1080,         // the height of draft
      minScale: 0.5,             // minimum scaling ratio for each axis
      mode: ResponsiveMode.FILL, // fill up the screen size completely
    }}>
      <Header>Title with fixed font size</Header>
    </ResponsiveProvider>
  )
}
```

## 👶 Author

Hey, friends. I'm John Huang, a full stack developer majorly code with React, Next.js, GraphQL, TailwindCSS, Taro and SpringBoot. Feel free to contact with me 😃

- GitHub: <https://github.com/fsjohnhuang>
- LinkedIn: <https://www.linkedin.com/in/fsjohnhuang>
- Blog: <https://fsjohnhuang.cnblogs.com/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/meta-ultra/responsive-view/issues).
