# Pi Display

## Installation Instructions

### API-side

1. If you don't have Yarn, `brew install yarn`.
1. If/once you do, run `yarn install`.
1. You'll need mongo installed on your computer and that's very easy to do with homebrew. You can follow the instructions [here](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) for installation and usage.
1. Once you have mongo running, you can run `yarn api:start` in its own terminal window.

### Client-side

You will want to have the api's server running before proceeding. Once you do have it running, you can continue with these instructions:

1. Run `yarn client:start` in its own terminal window.
1. Visit [localhost:8080](http://localhost:8080) in your browser.

## Testing

Run `yarn test`.
