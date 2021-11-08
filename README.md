# Phaser 3 Project

<p float="left">
  <img src='https://img.shields.io/badge/Status-Maintained-brightgreen'  alt="Status"/>
  <img src='https://img.shields.io/badge/Phaser-3.55.2-blue'  alt="Version"/>
  <img src='https://img.shields.io/badge/Contribution-Open-brightgreen'  alt="Contribution"/>
</p>

## Quickstart

1. Clone this repo
2. Install all your dependencies by run `npm install` or `yarn install`
3. Run your dev server by `npm run dev`
4. Make changes under [`LoadingSceneController.ts`](https://github.com/Arsyel/phaser3-game/blob/main/src/ts/scenes/loading/LoadingSceneController.ts) if you want to load some assets (It's defined from [`ts/collections/`](https://github.com/Arsyel/phaser3-game/tree/main/src/ts/collections) dir)
5. Make changes under [`GameplaySceneController.ts`](https://github.com/Arsyel/phaser3-game/blob/main/src/ts/scenes/gameplay/GameplaySceneController.ts) for your main gameplay script
6. Make changes under [`src/index.ts`](https://github.com/Arsyel/phaser3-game/blob/main/src/index.ts) if you want to add new scene

## CLI

In `package.json` file and section `scripts` listed handy commands to help your development process. You can add more if needed.

| script | details |
| ------ | ------- |
| `npm run dev` | Start your development server in port 8080 (if available), also notice that folder `./assets` is served as public static folder
| `npm run build` | Build your project into `dist/` folder
| `npm run dist` | Run static server from your `dist/` folder

## ESlint

For update [eslint rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules)
