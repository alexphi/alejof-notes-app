# alejof-notes-app

This app allows me to write some things to display on the [main site](https://alejof.dev), and manage the stuff I want to appear (or not) there.

## Basics - Dependencies

* This app was scaffolded by [vue-cli][vue-cli], so usual scrips apply (`npm run serve`, `npm run build`, and so on).

* I'm using Auth0 for authentication, following the tutorial found [here][auth0]. Basically, copy-pasting :D

One thing to note, though, is that I'm using the generated JWT token to pass it to the notes-api, so that's where this app starts to diverge from the tutorial.

* I'm using TailwindCSS with PostCSS to manage the styles and the final file size. It's set up via a [vue-cli plugin][css-plugin].

* The markdown viewer is [vue-showdown][md].

[vue-cli]:https://cli.vuejs.org/
[auth0]:https://auth0.com/docs/quickstart/spa/vuejs
[css-plugin]:https://github.com/forsartis/vue-cli-plugin-tailwind
[md]:https://github.com/meteorlxy/vue-showdown

* The Notes API url needs to be defined in a `VUE_APP_API_BASE_URL` environment variable before running the app.
