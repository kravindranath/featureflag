# Feature flags

# 🚩 Feature Flag System – React + Vite

This project includes a lightweight feature flagging system designed for single-page applications built with **React + Vite**. It enables runtime control of feature visibility using `localStorage` and URL query parameters.

## 🔧 How It Works

Feature flags are stored in the browser’s `localStorage` and accessed using a custom React hook:

```js
const showContact = useFeatureFlag("showContact");

return showContact ? <Contact /> : null;
```

The `useFeatureFlag` hook:

- Reads the flag from `localStorage`
- Applies override from URL query parameters (`?feature=...&toggle=...`)
- Keeps the value reactive using `useLocalStorage`

## 🌐 Enable or Disable Flags via URL

You can toggle feature flags at runtime using URL query parameters:

| Action            | Example URL                                             |
| ----------------- | ------------------------------------------------------- |
| ✅ Enable a flag  | `http://localhost:5173/?feature=showContact&toggle=on`  |
| ❌ Disable a flag | `http://localhost:5173/?feature=showContact&toggle=off` |

This sets the following key in `localStorage`:

```
showContact → "true" or "false"
```

Flags persist between sessions unless explicitly removed or cleared.

## 💻 Developer Tools

To inspect or manually modify feature flags:

1. Open DevTools → Application → Local Storage
2. Look for keys like `showContact`, `enableBetaUI`, etc.
3. You can manually toggle with `localStorage.setItem('showContact', 'true')`

To reset all flags:

```js
localStorage.clear();
```

## 📁 Relevant Code Structure

```
src/
├── hooks/
│   ├── useFeatureFlag.js         // React hook to access a flag
│   └── useLocalStorage.js        // Syncs state with localStorage
├── utils/
│   ├── localStorageItem.js    // Safely read from localStorage using setLocalStorageItem and getLocalStorageItem

```

## ✅ Usage Example

```js
import useFeatureFlag from "./hooks/useFeatureFlag";

export default function ContactPage() {
  const showContact = useFeatureFlag("showContact");

  return showContact ? <Contact /> : null;
}
```

## 🧪 Tips

- Feature flag URLs work with any route:

  ```
  http://localhost:5173/dashboard?feature=showContact&toggle=on

  ```

- Each feature flag is independent and scoped by name.
- Flags are persisted per browser (not shared across users).

## 📌 Next Steps (Optional Enhancements)

- Add a toggle UI panel for dev/QA testing
- Sync feature flags across tabs using the `storage` event
- Load predefined flags from a config JSON or remote source
