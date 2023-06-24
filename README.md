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

## Installation

```bash
yarn add medusa-plugin-blog
medusa migrations run
```

## Configuration

Enable in your medusa-config.js file similar to other plugins:

```bash
const plugins = [
  `medusa-plugin-ratings`,
  ...
]
```

## API Endpoints

### `GET /store/products/:id/reviews`
Returns a json object with an array of reviews for the product with the given id

### `GET /store/customers/me/reviews`
Returns a json object with an array of reviews for the logged in customer

### `GET /store/reviews/:id`
Returns a json object with the review with the given id

### `POST /store/products/:id/reviews`
Adds a review for the product with the given id. The request must come from a logged in customer.  The body of the request should be a json object with the following properties:

```js
{
   display_name: string!,
   content: string!,
   rating: number.min(0).max(5)!
}
```

### `POST /store/reviews/:id`
Updates a review with the given id. The body of the request should be a json object with the following properties:

```js
{
   display_name: string!,
   content: string!,
   rating: number.min(0).max(5)!
}
```

### `GET /admin/products/:id/reviews`
Returns a json object with an array of reviews for the product with the given id.  The request must come from a logged in admin user.

### `GET /admin/customers/:id/reviews`
Returns a json object with an array of reviews for the customer with the given customer id.  The request must come from a logged in admin user.

### `POST /admin/reviews/:id`
Updates a review with the given id. The request must come from a logged in admin user.  The body of the request should be a json object with the following properties:

```js
{
   display_name: string!,
   content: string!,
   rating: number.min(0).max(5)!,
   approved: boolean!
}
```

### `DELETE /admin/reviews/:id`
Deletes the review with the given id. Not a soft delete. The request must come from a logged in admin user.
