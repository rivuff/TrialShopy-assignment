
# TrialShopy Assignment


## Overview

This project is designed with a focus on secure authentication, category management, and user reviews. Below are key aspects explained briefly.

### Authentication

- **Middleware Usage:**
  - `isAuthenticated`: Ensures that users are logged in before accessing certain routes.
  - `isOwner`: Allows only the account owner to perform actions like updating or deleting user information.

- **APIs:**
  - `POST /auth/logout`: Logs out the authenticated user.

### User Management

- **Middleware Usage:**
  - `isOwner`: Allows only the account owner to update or delete their account.

- **APIs:**
  - `DELETE /users/:id`: Deletes a user account, accessible only by the account owner.
  - `PATCH /users/:id`: Updates user information, requires authentication and ownership.

### Products

- **Category Schema:**
  - A separate category schema is used and referenced as a foreign key in the products schema.

- **APIs:**
  - `POST /product/addcategory`: Adds a category to a product, utilizing the category schema.

### Review

- **Review Schema:**
  - A separate review schema is implemented with `productId` and `userId` as foreign keys.
  - Responses to reviews include `reviewId` as a foreign key.

- **APIs:**
  - `POST /review/post`: Posts a new review.
  - `POST /reviews/respond`: Responds to a review, referencing `reviewId`.

---

## Key Concepts

- **Secure Authentication:**
  - Middleware ensures that certain actions are performed only when users are logged in.

- **Category Management:**
  - A separate category schema is used, enhancing organization and referencing it in the products schema.

- **Review System:**
  - Reviews and responses are managed through a dedicated schema, maintaining structured relationships.

---

## GitHub Code

Refer to the code on GitHub for detailed implementations:

- [Authentication Middleware](link-to-auth-middleware)
- [User Management](link-to-user-management)
- [Products API](link-to-products-api)
- [Category Schema](link-to-category-schema)
- [Review Schema and APIs](link-to-review-schema-and-apis)

---

## Need to add .env properties to run the code
-MongoURI,
-SECRETKEY,
-SESSIONkEY

## Authentication

### Register User

```http
POST /auth/register
```

Registers a new user.

### User Login

```http
POST /auth/login
```

Logs in a user.

### User Logout

```http
POST /auth/logout
```

Logs out the authenticated user.

## User Management

### Get All Users

```http
GET /users
```

Retrieves a list of all users.

### Delete User

```http
DELETE /users/:id
```

Deletes a user by ID.

### Update User

```http
PATCH /users/:id
```

Updates user information.

## Products

### Get All Products

```http
POST /product/all
```

Retrieves all products.

### Create Product

```http
POST /product/create
```

Creates a new product.

### Get Products by Name

```http
GET /product/find
```

Retrieves products by name.

### Get Product by ID

```http
GET /product/:id
```

Retrieves a product by ID.

### Delete Product

```http
DELETE /product/:id
```

Deletes a product by ID.

### Update Product

```http
PATCH /product/:id
```

Updates product information.

### Bulk Upload Products

```http
POST /product/bulkcreate
```

Uploads multiple products at once.

### Add Category to Product

```http
POST /product/addcategory
```

Adds a category to a product.

### Update Commission for Product

```http
POST /product/updatecommision
```

Updates the commission for a product.

### Get Commission History for Product

```http
GET /product/commision/history/:id
```

Retrieves the commission history for a product.

### Toggle Product Status

```http
PATCH /product/togglestatus/:id
```

Toggles the status of a product.

## Category

### Create Category

```http
POST /category/create
```

Creates a new category.

### Get All Categories

```http
GET /category/getAll
```

Retrieves all categories.

### Delete Category

```http
DELETE /category/:id
```

Deletes a category by ID.

### Update Category

```http
PATCH /category/:id
```

Updates category information.

## Review

### Create Review

```http
POST /review/post
```

Posts a new review.

### Get All Reviews

```http
GET /review/getAll
```

Retrieves all reviews.

### Get Review by ID

```http
GET /review/:id
```

Retrieves a review by ID.

### Respond to Review

```http
POST /reviews/respond
```

Responds to a review.
