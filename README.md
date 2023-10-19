# Responsive View

Scale-based responsive solution for digital big screen.

## Setup

```bash
pnpm i
```

## Bundle

```bash
pnpm build
```

## Limitation

```jsx
const Demo = () => {
  return (
    <div id="parent">
      <ResponsiveView style={{height: 500}} />
    </div>
  )
}
```

The ResponsiveView will shrink to height of 400, but the height of its parent is still 500.

## TODO

1. Output commonjs2 module system version of bundle.
2. Auto detect the parent's size to determine using absolute positioning or not.
