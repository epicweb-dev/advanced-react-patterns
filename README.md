<div>
  <h1 align="center"><a href="https://www.epicweb.dev/workshops">🤯 Advanced React Patterns</a></h1>
  <strong>
    Learn how to build simple and flexible React Components and Hooks using
    modern patterns
  </strong>
  <p>
    Not only learn great patterns you can use but also the strengths and
    weaknesses of each, so you know which to reach for to provide your custom
    hooks and components the flexibility and power you need.
  </p>
</div>

<hr />

<div align="center">
  <a
    alt="Epic Web logo with the words Deployed Version"
    href="https://advanced-react-patterns.epicweb.dev"
  >
    <img
      width="300px"
      src="https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/254000390-447a3559-e7b9-4918-947a-1b326d239771.png"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## Prerequisites

- The more experience you have with building React abstractions, the more
  helpful this workshop will be for you.

## Pre-workshop Resources

Here are some resources you can read before taking the workshop to get you up to
speed on some of the tools and concepts we'll be covering:

- [Inversion of Control](https://kentcdodds.com/blog/inversion-of-control)
- [Implement Inversion of Control](https://egghead.io/lessons/egghead-implement-inversion-of-control?pl=kent-s-blog-posts-as-screencasts-eefa540c&af=5236ad)

## System Requirements

- [git][git] v2.18 or greater
- [NodeJS][node] v20 or greater
- [npm][npm] v8 or greater

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

This is a pretty large project (it's actually many apps in one) so it can take
several minutes to get everything set up the first time. Please have a strong
network connection before running the setup and grab a snack.

Follow these steps to get this set up:

```sh nonumber
git clone --depth 1 https://github.com/epicweb-dev/advanced-react-patterns.git
cd advanced-react-patterns
npm run setup
```

If you experience errors here, please open [an issue][issue] with as many
details as you can offer.

## The Workshop App

Learn all about the workshop app on the
[Epic Web Getting Started Guide](https://www.epicweb.dev/get-started).

[![Kent with the workshop app in the background](https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/280407082-0e012138-e01d-45d5-abf2-86ffe5d03c69.png)](https://www.epicweb.dev/get-started)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/github/actions/workflow/status/epicweb-dev/advanced-react-patterns/validate.yml?branch=main&logo=github&style=flat-square
[build]: https://github.com/epicweb-dev/advanced-react-patterns/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/epicweb-dev/advanced-react-patterns/blob/main/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/epicweb-dev/advanced-react-patterns/issues/new
<!-- prettier-ignore-end -->
