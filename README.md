# Advanced React Patterns

👋 hi there! My name is [Kent C. Dodds](https://kentcdodds.com)! This is a
workshop repo to teach you about using React Component Patterns to make your
react components and hooks more useful and reusable without sacrificing
simplicity.

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![AppVeyor Build Status][win-build-badge]][win-build]
[![Code Coverage][coverage-badge]][coverage]
[![GPL 3.0 License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## Pre-Workshop Instructions/Requirements

In order for us to maximize our efforts during the workshop, please complete the
following things to prepare (the TV emoji 📺 indicates steps that are only
necessary if the workshop is remote via Zoom):

- [ ] Setup the project (follow the setup instructions below) (~5 minutes)
- [ ] 📺 Install and setup [Zoom](https://zoom.us) on the computer you will be
      using (~5 minutes)
- [ ] 📺 Watch
      [Use Zoom for KCD Workshops](https://egghead.io/lessons/egghead-use-zoom-for-kcd-workshops)
      (~8 minutes).
- [ ] Watch
      [Setup and Logistics for KCD Workshops](https://egghead.io/lessons/egghead-setup-and-logistics-for-kcd-workshops)
      (~24 minutes). Please do NOT skip this step.
- [ ] Watch [The Beginner's Guide to React](https://kcd.im/beginner-react)
      (available free on Egghead.io), or have the equivalent experience (77
      minutes)
- [ ] Watch my talk
      [Why React Hooks](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
      (35 minutes)
- [ ] Go through my
      [Learn React Hooks Workshop](https://kentcdodds.com/workshops/hooks), or
      have the equivalent basic experience of using hooks. You should be
      experienced with `useState`, `useEffect`, and `useRef`.
- [ ] Go through my
      [Advanced React Hooks Workshop](https://kentcdodds.com/workshops/advanced-react-hooks),
      or have the equivalent experience. You should be experienced with
      `useContext` and `useReducer` (experience with `useMemo` and `useCallback`
      is a bonus).

The more prepared you are for the workshop, the better it will go for you.

## Workshop Outline

Here are the patterns we'll be covering:

- Context Controller
- Compound Components
- State Reducers
- Controlled Props
- Prop Collections
- Prop Getters

## System Requirements

- [git][git] v2 or greater
- [NodeJS][node] v10 or greater
- [npm][npm] v5.2.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

You may be able to work through the entire workshop in the browser. It requires
absolutely no setup whatsoever, though people do sometimes have trouble with it
working perfectly. However, if you would like to try it, go to
[this codesandbox](https://codesandbox.io/s/github/kentcdodds/advanced-react-patterns)
and you should be good to go.

[![Edit advanced-react-patterns](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/kentcdodds/advanced-react-patterns)

If you'd rather be able to work through the workshop on your own computer, then
follow the following instructions.

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```
git clone https://github.com/kentcdodds/advanced-react-patterns.git
cd advanced-react-patterns
npm run setup --silent
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier If you get any errors, please read through
them and see if you can find out what the problem is. You may also want to look
at [Troubleshooting](#troubleshooting). If you can't work it out on your own
then please [file an issue][issue] and provide _all_ the output from the
commands you ran (even if it's a lot).

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

Click around and become familiar with the app and the exercises.

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://github.com/facebook/create-react-app) application.

You can also open
[the deployment of the app on Netlify](https://advanced-react-patterns.netlify.com/).

## Running the tests

```shell
npm test
```

This will start [Jest](https://jestjs.io/) in watch mode. Read the output and
play around with it.

**Your goal will be to go into each test, swap the final version for the
exercise version in the import, and make the tests pass**

## Helpful Emoji 🐨 💰 💯 🦉 📜 💣 🚨

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala Bear** 🐨 will tell you when there's something specific you
  should do
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code)
  along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you
  finish the exercises early.
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a
  link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation
- **Berry the Bomb** 💣 will be hanging around anywhere you need to blow stuff
  up (delete code)
- **Peter the Product Manager** 👨‍💼 helps us know what our users want
- **Alfred the Alert** 🚨 will occasionally show up in the test failures with
  potential explanations for why the tests are failing.

## Troubleshooting

<details>

<summary>"npm run setup" command not working</summary>

Please read through the error message and identify the step that is failing.
There should be an error message that will hopefully help guide you to the
solution. If it doesn't, please copy and past _all_ of the output into a new
issue on the project repository.

</details>

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/FWeinb"><img src="https://avatars0.githubusercontent.com/u/1250430?v=4" width="100px;" alt="FWeinb"/><br /><sub><b>FWeinb</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/issues?q=author%3AFWeinb" title="Bug reports">🐛</a> <a href="#ideas-FWeinb" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/dlannoye"><img src="https://avatars2.githubusercontent.com/u/1383720?v=4" width="100px;" alt="David Lannoye"/><br /><sub><b>David Lannoye</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/issues?q=author%3Adlannoye" title="Bug reports">🐛</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=dlannoye" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/colinrcummings"><img src="https://avatars2.githubusercontent.com/u/9815009?s=460&v=4" width="100px;" alt="Colin Cummings"/><br /><sub><b>Colin Cummings</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=colinrcummings" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=colinrcummings" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/bkoltai"><img src="https://avatars2.githubusercontent.com/u/464764?v=4" width="100px;" alt="Benji Koltai"/><br /><sub><b>Benji Koltai</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=bkoltai" title="Documentation">📖</a></td>
    <td align="center"><a href="http://baggasumit.github.io"><img src="https://avatars1.githubusercontent.com/u/1779959?v=4" width="100px;" alt="Sumit Bagga"/><br /><sub><b>Sumit Bagga</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=baggasumit" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Tarabyte"><img src="https://avatars0.githubusercontent.com/u/2027010?v=4" width="100px;" alt="Yury Tarabanko"/><br /><sub><b>Yury Tarabanko</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=Tarabyte" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.wendtedesigns.com/"><img src="https://avatars2.githubusercontent.com/u/5779538?v=4" width="100px;" alt="Alex Wendte"/><br /><sub><b>Alex Wendte</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=themostcolm" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/CompuIves"><img src="https://avatars3.githubusercontent.com/u/587016?v=4" width="100px;" alt="Ives van Hoorne"/><br /><sub><b>Ives van Hoorne</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=CompuIves" title="Code">💻</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=CompuIves" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://team.thebrain.pro"><img src="https://avatars1.githubusercontent.com/u/4002543?v=4" width="100px;" alt="Łukasz Gandecki"/><br /><sub><b>Łukasz Gandecki</b></sub></a><br /><a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=lgandecki" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/deniztetik"><img src="https://avatars0.githubusercontent.com/u/14167019?v=4" width="100px;" alt="Deniz Tetik"/><br /><sub><b>Deniz Tetik</b></sub></a><br /><a href="#content-deniztetik" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Ruffeng"><img src="https://avatars1.githubusercontent.com/u/18511772?v=4" width="100px;" alt="Ruffeng"/><br /><sub><b>Ruffeng</b></sub></a><br /><a href="#content-Ruffeng" title="Content">🖋</a> <a href="https://github.com/kentcdodds/advanced-react-patterns/commits?author=Ruffeng" title="Code">💻</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt="Justin Dorfman"/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## License

This material is available for private, non-commercial use under the
[GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you
would like to use this material to conduct your own workshop, please contact me
at kentcdodds@gmail.com

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/travis/kentcdodds/advanced-react-patterns.svg?style=flat-square&logo=travis
[build]: https://travis-ci.org/kentcdodds/advanced-react-patterns
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/advanced-react-patterns/blob/master/README.md#license
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/advanced-react-patterns/blob/master/CODE_OF_CONDUCT.md
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/advanced-react-patterns/issues/new
[win-build-badge]: https://img.shields.io/appveyor/ci/kentcdodds/advanced-react-patterns.svg?style=flat-square&logo=appveyor
[win-build]: https://ci.appveyor.com/project/kentcdodds/advanced-react-patterns
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/advanced-react-patterns.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/advanced-react-patterns
[watchman]: https://facebook.github.io/watchman/docs/install.html
<!-- prettier-ignore-end -->
