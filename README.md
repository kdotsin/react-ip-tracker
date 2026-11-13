# IP Address Tracker (React)

A React and TypeScript web app that looks up an IP address or domain and shows where it is on a map. When the page opens it shows your own IP. Type in another IP or domain, hit the arrow, and the page shows its address, location, timezone, and internet provider, then moves the map pin to that spot.

This is a rebuild of my earlier vanilla TypeScript [IP Address Tracker](https://github.com/kdotsin/ip-address-tracker), this time with React components, a custom hook, and Context.

## Features

- Search any IPv4 address or domain name and get its city, region, postal code, UTC offset, and ISP
- Shows the visitor's own IP and location as soon as the page loads
- Interactive map that pans to the searched location and moves the marker
- Input validation: the search box checks for a valid IPv4 address (four numbers from 0 to 255) or a domain like `google.com` as you type, and won't submit anything else
- Responsive layout: the info cards stack and center on mobile, and sit in a row with dividers on desktop
- The info card overlaps the header and the map, so the search area and the map read as one screen

## Built With

- **[React 19](https://react.dev/)** with TypeScript, set up with **[Vite](https://vite.dev/)**
- **Tailwind CSS v4** (browser build), with custom component classes made with `@apply`
- **[Leaflet 2.0](https://leafletjs.com/)** (installed from npm) for the map, with [OpenStreetMap](https://www.openstreetmap.org/) tiles
- **[Axios](https://axios-http.com/)** for the API request
- **[IPify Geolocation API](https://geo.ipify.org/)** for the IP data
- **[Oxlint](https://oxc.rs/)** for linting

## Project Structure

```
react-ip-tracker/
├── index.html                # Page shell and Tailwind component styles
├── .env.local                # Your IPify API key (not committed, see Getting Started)
└── src/
    ├── main.tsx              # Entry point: renders <App /> in StrictMode
    ├── App.tsx               # Page layout; holds the search query and shares the data
    ├── components/
    │   ├── SearchBar.tsx     # Search form with IP / domain validation
    │   ├── ContentBar.tsx    # The four info cards (IP, location, timezone, ISP)
    │   └── MapView.tsx       # Leaflet map and location pin
    ├── hooks/
    │   └── useFetch.ts       # Calls IPify whenever the search changes
    ├── context/
    │   └── IpContext.ts      # Context that shares the IP data with the components
    ├── types/
    │   └── types.ts          # ipAPI and Location interfaces
    └── images/               # Background patterns, icons, favicon
```

### How it works

1. `App.tsx` stores the submitted search in state and passes it to the `useFetch` hook.
2. `useFetch` calls IPify whenever the search changes. On first load the search is empty, so IPify returns the visitor's own IP. If the search is only digits and dots it's sent as `ipAddress=`, otherwise as `domain=`.
3. The response goes into `IpContext`, so `ContentBar` and `MapView` can both read it without passing props.
4. `SearchBar` validates the input as you type and only calls `onSubmit` when it's a valid IP or domain.
5. `MapView` creates the Leaflet map once, then calls `setView()` and moves the marker every time new data comes in.

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Get a free API key from [IPify Geolocation](https://geo.ipify.org/), then create a file called `.env.local` in the project folder:
   ```
   VITE_IPIFY_KEY=your_api_key_here
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the link Vite prints in the terminal (usually <http://localhost:5173>) and search for an IP address or domain.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Type-checks and builds the app into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm run lint` | Runs Oxlint on the project |

## Known Limitations

- **The API key is not secret.** Keeping it in `.env.local` keeps it out of git, but Vite still puts it into the built JavaScript, so anyone can find it in the browser. Hiding it would need a small backend server.
- **Only IPv4 addresses work.** IPv6 addresses don't pass validation.
- **Failed lookups show no message.** If a lookup fails (for example, a domain that doesn't exist), the error is only logged to the console, and the page keeps showing the last result.
- **There's no loading indicator** while a lookup is in progress.
- **Development-only Tailwind and beta Leaflet.** The Tailwind browser build is meant for development, not production, and Leaflet 2.0 is still in beta.
