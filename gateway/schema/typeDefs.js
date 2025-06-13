const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # User Types
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

  # Product Types
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

  # Order Types
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

  # Payment Types
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

  # Review Types
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

  # Room Service Types (External)
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

  # Queries
  type Query {
    # User Queries
    users: [User!]!
    user(id: ID!): User

    # Product Queries
    products: [Product!]!
    product(id: ID!): Product

    # Order Queries
    orders: [Order!]!
    order(id: ID!): Order
    ordersByStatus(status: String!): [Order!]!

    # Payment Queries
    payments: [Payment!]!
    payment(id: ID!): Payment
    paymentsByOrderId(orderId: String!): [Payment!]!

    # Review Queries
    reviews: [Review!]!
    review(id: ID!): Review
    reviewsByProductId(productId: String!): [Review!]!

    # Room Service Queries (External)
    rooms: [Room!]!
    room(id: Int!): Room
    availableRooms: [Room!]!
  }

  # Mutations
  type Mutation {
    # User Mutations
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): String!

    # Product Mutations
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): String!

    # Order Mutations
    createOrder(input: OrderInput!): Order!
    updateOrder(id: ID!, input: OrderInput!): Order!
    deleteOrder(id: ID!): String!

    # Payment Mutations
    createPayment(input: PaymentInput!): Payment!
    updatePayment(id: ID!, input: PaymentInput!): Payment!
    deletePayment(id: ID!): String!

    # Review Mutations
    createReview(input: ReviewInput!): Review!
    updateReview(id: ID!, input: ReviewInput!): Review!
    deleteReview(id: ID!): String!

    # Room Service Mutations (External)
    createRoom(input: RoomInput!): Room!
    updateRoom(id: Int!, input: RoomInput!): Room!
    deleteRoom(id: Int!): String!
  }
`;

module.exports = typeDefs;
