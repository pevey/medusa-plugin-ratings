# medusa-plugin-ratings

Simple reviews and ratings for Medusajs

[Documentation](https://pevey.com/medusa-plugin-ratings)

If you are not familiar with Medusa, you can learn more on [the project web site](https://www.medusajs.com/).

> Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

## Features

- Adds review object and data repository
- Adds endpoints for retrieving reviews by product and by customer
- Adds endpoint for adding a review
- By default, reviews are set with field `approved` to `false` (boolean)
- Until Medusa adds extensibility for the admin app, approval must be done manually in the database.

## Configuration

Enable in your medusa-config.js file similar to other plugins:

```bash
const plugins = [
  `medusa-plugin-ratings`,
  ...
]
```
