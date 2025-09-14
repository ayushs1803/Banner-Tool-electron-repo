# BannerTool (Electron) — Build and Run

## Prerequisites (builder machine)
- Node.js 18+ and npm installed.
- Internet access to download npm packages.

## Run locally (for testing)
1. `npm install`
2. `npm start`
3. In the app: drag & drop an image, pick template, click Export. Output saved to `C:\Users\<you>\BannerTool-Outputs`.

## Build Windows portable EXE locally
1. `npm install`
2. `npm run dist`
3. Result: `dist/` contains `BannerTool-1.0.0.exe` (portable). Share this EXE.

> If `sharp` fails to install locally on Windows, use the GitHub Actions workflow included to build the EXE in the cloud.
