# Hotel Logistics Microservices API Documentation

## Arsitektur Sistem

Sistem Hotel Logistics terdiri dari 5 microservices yang berkomunikasi melalui REST API dan disatukan dalam GraphQL Gateway:

- **User Service** (Port 3001) - Manajemen pengguna sistem
- **Product Service** (Port 3002) - Manajemen produk/barang
- **Order Service** (Port 3003) - Manajemen permintaan barang
- **Payment Service** (Port 3004) - Manajemen pembayaran
- **Review Service** (Port 3005) - Manajemen review produk
- **GraphQL Gateway** (Port 4000) - Gateway terpusat untuk semua service

---

## 1. USER SERVICE API

### Base URL: `http://localhost:3001/api/users`

#### GET /api/users

Mendapatkan semua data pengguna

**Response:**

```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@hotel.com",
    "role": "gudang",
    "created_at": "2025-06-13T00:00:00.000Z"
  }
]
```

#### GET /api/users/:id

Mendapatkan data pengguna berdasarkan ID

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@hotel.com",
  "role": "gudang",
  "created_at": "2025-06-13T00:00:00.000Z"
}
```

#### POST /api/users

Membuat pengguna baru

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@hotel.com",
  "password_hash": "password123",
  "role": "gudang"
}
```

**Roles Available:** `gudang`, `housekeeping`, `manajer`, `admin`

#### PUT /api/users/:id

Mengupdate data pengguna

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "johnsmith@hotel.com",
  "role": "manajer"
}
```

#### DELETE /api/users/:id

Menghapus pengguna

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

---

## 2. PRODUCT SERVICE API

### Base URL: `http://localhost:3002/api/products`

#### GET /api/products

Mendapatkan semua produk

**Response:**

```json
[
  {
    "id": "product_id",
    "name": "Handuk Mandi",
    "category": "Textile",
    "description": "Handuk untuk kamar hotel",
    "stock_quantity": 100,
    "unit": "pcs",
    "created_at": "2025-06-13T00:00:00.000Z"
  }
]
```

#### GET /api/products/:id

Mendapatkan produk berdasarkan ID

#### POST /api/products

Membuat produk baru

**Request Body:**

```json
{
  "name": "Handuk Mandi",
  "category": "Textile",
  "description": "Handuk untuk kamar hotel",
  "stock_quantity": 100,
  "unit": "pcs"
}
```

#### PUT /api/products/:id

Mengupdate produk

#### DELETE /api/products/:id

Menghapus produk

---

## 3. ORDER SERVICE API

### Base URL: `http://localhost:3003/api/orders`

#### GET /api/orders

Mendapatkan semua order

**Response:**

```json
[
  {
    "id": "order_id",
    "requester_id": "user_id",
    "product_id": "product_id",
    "quantity": 5,
    "department": "housekeeping",
    "status": "pending",
    "requested_at": "2025-06-13T00:00:00.000Z",
    "updated_at": "2025-06-13T00:00:00.000Z"
  }
]
```

#### GET /api/orders/:id

Mendapatkan order berdasarkan ID

#### GET /api/orders/status/:status

Mendapatkan order berdasarkan status

**Status Available:** `pending`, `approved`, `delivered`, `rejected`

#### POST /api/orders

Membuat order baru

**Request Body:**

```json
{
  "requester_id": "user_id",
  "product_id": "product_id",
  "quantity": 5,
  "department": "housekeeping"
}
```

#### PUT /api/orders/:id

Mengupdate order

**Request Body:**

```json
{
  "status": "approved",
  "quantity": 3
}
```

#### DELETE /api/orders/:id

Menghapus order

---

## 4. PAYMENT SERVICE API

### Base URL: `http://localhost:3004/api/payments`

#### GET /api/payments

Mendapatkan semua pembayaran

**Response:**

```json
[
  {
    "id": "payment_id",
    "order_id": "order_id",
    "amount": 150000,
    "purpose": "Pembelian handuk",
    "payment_method": "Bank Transfer",
    "paid_at": "2025-06-13T00:00:00.000Z"
  }
]
```

#### GET /api/payments/:id

Mendapatkan pembayaran berdasarkan ID

#### GET /api/payments/order/:orderId

Mendapatkan pembayaran berdasarkan Order ID

#### POST /api/payments

Membuat pembayaran baru

**Request Body:**

```json
{
  "order_id": "order_id",
  "amount": 150000,
  "purpose": "Pembelian handuk",
  "payment_method": "Bank Transfer"
}
```

#### PUT /api/payments/:id

Mengupdate pembayaran

#### DELETE /api/payments/:id

Menghapus pembayaran

---

## 5. REVIEW SERVICE API

### Base URL: `http://localhost:3005/api/reviews`

#### GET /api/reviews

Mendapatkan semua review

**Response:**

```json
[
  {
    "id": "review_id",
    "product_id": "product_id",
    "user_id": "user_id",
    "rating": 5,
    "comment": "Produk sangat bagus",
    "created_at": "2025-06-13T00:00:00.000Z"
  }
]
```

#### GET /api/reviews/:id

Mendapatkan review berdasarkan ID

#### GET /api/reviews/product/:productId

Mendapatkan review berdasarkan Product ID

#### POST /api/reviews

Membuat review baru

**Request Body:**

```json
{
  "product_id": "product_id",
  "user_id": "user_id",
  "rating": 5,
  "comment": "Produk sangat bagus"
}
```

**Rating:** 1-5 (integer)

#### PUT /api/reviews/:id

Mengupdate review

#### DELETE /api/reviews/:id

Menghapus review

---

## Health Check Endpoints

Setiap service memiliki health check endpoint:

- **User Service:** `GET http://localhost:3001/health`
- **Product Service:** `GET http://localhost:3002/health`
- **Order Service:** `GET http://localhost:3003/health`
- **Payment Service:** `GET http://localhost:3004/health`
- **Review Service:** `GET http://localhost:3005/health`
- **GraphQL Gateway:** `GET http://localhost:4000/health`

**Response Format:**

```json
{
  "service": "Service Name",
  "status": "OK",
  "port": 3001
}
```

---

## Error Response Format

Semua service menggunakan format error response yang konsisten:

```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Environment Variables

Setiap service membutuhkan environment variables berikut:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/service_name
```

Untuk Gateway tambahan:

```env
USER_SERVICE_URL=http://localhost:3001/api/users
PRODUCT_SERVICE_URL=http://localhost:3002/api/products
ORDER_SERVICE_URL=http://localhost:3003/api/orders
PAYMENT_SERVICE_URL=http://localhost:3004/api/payments
REVIEW_SERVICE_URL=http://localhost:3005/api/reviews
ROOM_SERVICE_URL=http://localhost:8001/graphql
```

# GraphQL Gateway Documentation

## Overview

GraphQL Gateway berfungsi sebagai API Gateway yang menyatukan semua microservices dalam satu endpoint GraphQL. Gateway ini menggabungkan 5 internal services dan 1 external room service.

**Gateway URL:** `http://localhost:4000/graphql`  
**GraphQL Playground:** `http://localhost:4000/graphql`

---

## Schema Types

### User Types

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  created_at: String!
}

input UserInput {
  name: String!
  email: String!
  password_hash: String!
  role: String!
}
```

### Product Types

```graphql
type Product {
  id: ID!
  name: String!
  category: String!
  description: String
  stock_quantity: Int!
  unit: String!
  created_at: String!
}

input ProductInput {
  name: String!
  category: String!
  description: String
  stock_quantity: Int!
  unit: String!
}
```

### Order Types

```graphql
type Order {
  id: ID!
  requester_id: String!
  product_id: String!
  quantity: Int!
  department: String!
  status: String!
  requested_at: String!
  updated_at: String!
}

input OrderInput {
  requester_id: String!
  product_id: String!
  quantity: Int!
  department: String!
  status: String
}
```

### Payment Types

```graphql
type Payment {
  id: ID!
  order_id: String!
  amount: Float!
  purpose: String!
  payment_method: String!
  paid_at: String!
}

input PaymentInput {
  order_id: String!
  amount: Float!
  purpose: String!
  payment_method: String!
}
```

### Review Types

```graphql
type Review {
  id: ID!
  product_id: String!
  user_id: String!
  rating: Int!
  comment: String
  created_at: String!
}

input ReviewInput {
  product_id: String!
  user_id: String!
  rating: Int!
  comment: String
}
```

### Room Types (External Service)

```graphql
type Room {
  id: Int!
  roomNumber: String!
  roomType: String!
  pricePerNight: Float!
  status: String!
}

input RoomInput {
  roomNumber: String!
  roomType: String!
  pricePerNight: Float!
  status: String!
}
```

---

## Queries

### User Queries

#### Get All Users

```graphql
query GetAllUsers {
  users {
    id
    name
    email
    role
    created_at
  }
}
```

#### Get User by ID

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    role
    created_at
  }
}
```

**Variables:**

```json
{
  "id": "user_id_here"
}
```

### Product Queries

#### Get All Products

```graphql
query GetAllProducts {
  products {
    id
    name
    category
    description
    stock_quantity
    unit
    created_at
  }
}
```

#### Get Product by ID

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    category
    description
    stock_quantity
    unit
  }
}
```

### Order Queries

#### Get All Orders

```graphql
query GetAllOrders {
  orders {
    id
    requester_id
    product_id
    quantity
    department
    status
    requested_at
    updated_at
  }
}
```

#### Get Orders by Status

```graphql
query GetOrdersByStatus($status: String!) {
  ordersByStatus(status: $status) {
    id
    requester_id
    product_id
    quantity
    department
    status
    requested_at
  }
}
```

**Variables:**

```json
{
  "status": "pending"
}
```

**Available Status:** `pending`, `approved`, `delivered`, `rejected`

### Payment Queries

#### Get All Payments

```graphql
query GetAllPayments {
  payments {
    id
    order_id
    amount
    purpose
    payment_method
    paid_at
  }
}
```

#### Get Payments by Order ID

```graphql
query GetPaymentsByOrderId($orderId: String!) {
  paymentsByOrderId(orderId: $orderId) {
    id
    order_id
    amount
    purpose
    payment_method
    paid_at
  }
}
```

### Review Queries

#### Get All Reviews

```graphql
query GetAllReviews {
  reviews {
    id
    product_id
    user_id
    rating
    comment
    created_at
  }
}
```

#### Get Reviews by Product ID

```graphql
query GetReviewsByProductId($productId: String!) {
  reviewsByProductId(productId: $productId) {
    id
    product_id
    user_id
    rating
    comment
    created_at
  }
}
```

### Room Queries (External Service)

#### Get All Rooms

```graphql
query GetAllRooms {
  rooms {
    id
    roomNumber
    roomType
    pricePerNight
    status
  }
}
```

#### Get Available Rooms

```graphql
query GetAvailableRooms {
  availableRooms {
    id
    roomNumber
    roomType
    pricePerNight
    status
  }
}
```

#### Get Room by ID

```graphql
query GetRoom($id: Int!) {
  room(id: $id) {
    id
    roomNumber
    roomType
    pricePerNight
    status
  }
}
```

---

## Mutations

### User Mutations

#### Create User

```graphql
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    id
    name
    email
    role
    created_at
  }
}
```

**Variables:**

```json
{
  "input": {
    "name": "John Doe",
    "email": "john@hotel.com",
    "password_hash": "password123",
    "role": "gudang"
  }
}
```

**Available Roles:** `gudang`, `housekeeping`, `manajer`, `admin`

#### Update User

```graphql
mutation UpdateUser($id: ID!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    role
  }
}
```

#### Delete User

```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

### Product Mutations

#### Create Product

```graphql
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
    category
    description
    stock_quantity
    unit
    created_at
  }
}
```

**Variables:**

```json
{
  "input": {
    "name": "Handuk Mandi",
    "category": "Textile",
    "description": "Handuk untuk kamar hotel",
    "stock_quantity": 100,
    "unit": "pcs"
  }
}
```

#### Update Product

```graphql
mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    category
    stock_quantity
    unit
  }
}
```

#### Delete Product

```graphql
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
```

### Order Mutations

#### Create Order

```graphql
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    id
    requester_id
    product_id
    quantity
    department
    status
    requested_at
  }
}
```

**Variables:**

```json
{
  "input": {
    "requester_id": "user_id_here",
    "product_id": "product_id_here",
    "quantity": 5,
    "department": "housekeeping"
  }
}
```

#### Update Order Status

```graphql
mutation UpdateOrder($id: ID!, $input: OrderInput!) {
  updateOrder(id: $id, input: $input) {
    id
    status
    updated_at
  }
}
```

**Variables:**

```json
{
  "id": "order_id_here",
  "input": {
    "requester_id": "user_id_here",
    "product_id": "product_id_here",
    "quantity": 3,
    "department": "housekeeping",
    "status": "approved"
  }
}
```

### Payment Mutations

#### Create Payment

```graphql
mutation CreatePayment($input: PaymentInput!) {
  createPayment(input: $input) {
    id
    order_id
    amount
    purpose
    payment_method
    paid_at
  }
}
```

**Variables:**

```json
{
  "input": {
    "order_id": "order_id_here",
    "amount": 150000,
    "purpose": "Pembelian handuk",
    "payment_method": "Bank Transfer"
  }
}
```

### Review Mutations

#### Create Review

```graphql
mutation CreateReview($input: ReviewInput!) {
  createReview(input: $input) {
    id
    product_id
    user_id
    rating
    comment
    created_at
  }
}
```

**Variables:**

```json
{
  "input": {
    "product_id": "product_id_here",
    "user_id": "user_id_here",
    "rating": 5,
    "comment": "Produk sangat bagus"
  }
}
```

**Rating:** 1-5 (integer)

### Room Mutations (External Service)

#### Create Room

```graphql
mutation CreateRoom($input: RoomInput!) {
  createRoom(input: $input) {
    id
    roomNumber
    roomType
    pricePerNight
    status
  }
}
```

**Variables:**

```json
{
  "input": {
    "roomNumber": "101",
    "roomType": "Standard",
    "pricePerNight": 100.0,
    "status": "available"
  }
}
```

#### Update Room

```graphql
mutation UpdateRoom($id: Int!, $input: RoomInput!) {
  updateRoom(id: $id, input: $input) {
    id
    roomNumber
    roomType
    pricePerNight
    status
  }
}
```

---

## Complex Query Examples

### Get Complete Order Information

```graphql
query GetCompleteOrderInfo($orderId: ID!) {
  order(id: $orderId) {
    id
    quantity
    department
    status
    requested_at
    updated_at
  }
  paymentsByOrderId(orderId: $orderId) {
    id
    amount
    purpose
    payment_method
    paid_at
  }
}
```

### Get Product with Reviews

```graphql
query GetProductWithReviews($productId: ID!) {
  product(id: $productId) {
    id
    name
    category
    description
    stock_quantity
    unit
  }
  reviewsByProductId(productId: $productId) {
    id
    user_id
    rating
    comment
    created_at
  }
}
```

### Get User Orders and Reviews

```graphql
query GetUserActivity($userId: String!) {
  user(id: $userId) {
    id
    name
    email
    role
  }
  reviews {
    id
    product_id
    rating
    comment
    created_at
  }
}
```

---

## Error Handling

GraphQL Gateway menangani error dari microservices dan mengembalikan format error GraphQL standar:

```json
{
  "errors": [
    {
      "message": "User not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["user"]
    }
  ],
  "data": {
    "user": null
  }
}
```

---

## Service Integration

Gateway terintegrasi dengan:

1. **Internal Services (REST API):**

   - User Service (http://localhost:3001)
   - Product Service (http://localhost:3002)
   - Order Service (http://localhost:3003)
   - Payment Service (http://localhost:3004)
   - Review Service (http://localhost:3005)

2. **External Service (GraphQL):**
   - Room Service (http://localhost:8001/graphql)

---

## Development & Testing

### Using GraphQL Playground

1. Buka `http://localhost:4000/graphql`
2. Gunakan schema explorer di sisi kanan
3. Test queries dan mutations di editor
4. Lihat hasil real-time

### Using cURL

```bash
curl -X POST \
  http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "query { users { id name email role } }"
  }'
```

### Using Postman

1. Method: POST
2. URL: `http://localhost:4000/graphql`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "query": "query GetAllUsers { users { id name email role } }"
}
```
