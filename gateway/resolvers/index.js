const axios = require("axios");
const { request, gql } = require("graphql-request");

// Service URLs
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3001/api/users";
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002/api/products";
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:3003/api/orders";
const PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL || "http://localhost:3004/api/payments";
const REVIEW_SERVICE_URL =
  process.env.REVIEW_SERVICE_URL || "http://localhost:3005/api/reviews";
const ROOM_SERVICE_URL =
  process.env.ROOM_SERVICE_URL || "http://localhost:8001/graphql";

// Helper function to transform MongoDB _id to id
const transformMongoData = (data) => {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      id: item._id || item.id,
      _id: undefined, // Remove _id from response
    }));
  }

  return {
    ...data,
    id: data._id || data.id,
    _id: undefined, // Remove _id from response
  };
};

// Helper function for safe error handling
const handleServiceError = (error, serviceName) => {
  console.error(`${serviceName} service error:`, {
    message: error.message,
    status: error.response?.status,
    statusText: error.response?.statusText,
    url: error.config?.url,
  });

  // Return clean error without circular references
  throw new Error(`${serviceName} service error: ${error.message}`);
};

const resolvers = {
  Query: {
    // User Resolvers
    users: async () => {
      try {
        const response = await axios.get(USER_SERVICE_URL);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "User");
      }
    },
    user: async (_, { id }) => {
      try {
        const response = await axios.get(`${USER_SERVICE_URL}/${id}`);
        return transformMongoData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          return null; // GraphQL will handle nullable field
        }
        handleServiceError(error, "User");
      }
    },

    // Product Resolvers
    products: async () => {
      try {
        const response = await axios.get(PRODUCT_SERVICE_URL);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Product");
      }
    },
    product: async (_, { id }) => {
      try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/${id}`);
        return transformMongoData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        handleServiceError(error, "Product");
      }
    },

    // Order Resolvers
    orders: async () => {
      try {
        const response = await axios.get(ORDER_SERVICE_URL);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Order");
      }
    },
    order: async (_, { id }) => {
      try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/${id}`);
        return transformMongoData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        handleServiceError(error, "Order");
      }
    },
    ordersByStatus: async (_, { status }) => {
      try {
        const response = await axios.get(
          `${ORDER_SERVICE_URL}/status/${status}`
        );
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Order");
      }
    },

    // Payment Resolvers
    payments: async () => {
      try {
        const response = await axios.get(PAYMENT_SERVICE_URL);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Payment");
      }
    },
    payment: async (_, { id }) => {
      try {
        const response = await axios.get(`${PAYMENT_SERVICE_URL}/${id}`);
        return transformMongoData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        handleServiceError(error, "Payment");
      }
    },
    paymentsByOrderId: async (_, { orderId }) => {
      try {
        const response = await axios.get(
          `${PAYMENT_SERVICE_URL}/order/${orderId}`
        );
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Payment");
      }
    },

    // Review Resolvers
    reviews: async () => {
      try {
        const response = await axios.get(REVIEW_SERVICE_URL);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Review");
      }
    },
    review: async (_, { id }) => {
      try {
        const response = await axios.get(`${REVIEW_SERVICE_URL}/${id}`);
        return transformMongoData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        handleServiceError(error, "Review");
      }
    },
    reviewsByProductId: async (_, { productId }) => {
      try {
        const response = await axios.get(
          `${REVIEW_SERVICE_URL}/product/${productId}`
        );
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Review");
      }
    },

    // Room Service Resolvers (External GraphQL)
    rooms: async () => {
      try {
        const query = gql`
          query GetAllRooms {
            rooms {
              id
              roomNumber
              roomType
              pricePerNight
              status
            }
          }
        `;
        const data = await request(ROOM_SERVICE_URL, query);
        return data.rooms;
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        throw new Error(`Room service error: ${error.message}`);
      }
    },
    room: async (_, { id }) => {
      try {
        const query = gql`
          query GetRoom($id: Int!) {
            room(id: $id) {
              id
              roomNumber
              roomType
              pricePerNight
              status
            }
          }
        `;
        const data = await request(ROOM_SERVICE_URL, query, { id });
        return data.room;
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        if (error.message.includes("not found")) {
          return null;
        }
        throw new Error(`Room service error: ${error.message}`);
      }
    },
    availableRooms: async () => {
      try {
        const query = gql`
          query GetAvailableRooms {
            availableRooms {
              id
              roomNumber
              roomType
              pricePerNight
              status
            }
          }
        `;
        const data = await request(ROOM_SERVICE_URL, query);
        return data.availableRooms;
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        throw new Error(`Room service error: ${error.message}`);
      }
    },
  },

  Mutation: {
    // User Mutations
    createUser: async (_, { input }) => {
      try {
        const response = await axios.post(USER_SERVICE_URL, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "User");
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${USER_SERVICE_URL}/${id}`, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "User");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(`${USER_SERVICE_URL}/${id}`);
        return "User deleted successfully";
      } catch (error) {
        handleServiceError(error, "User");
      }
    },

    // Product Mutations
    createProduct: async (_, { input }) => {
      try {
        const response = await axios.post(PRODUCT_SERVICE_URL, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Product");
      }
    },
    updateProduct: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${PRODUCT_SERVICE_URL}/${id}`, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Product");
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        await axios.delete(`${PRODUCT_SERVICE_URL}/${id}`);
        return "Product deleted successfully";
      } catch (error) {
        handleServiceError(error, "Product");
      }
    },

    // Order Mutations
    createOrder: async (_, { input }) => {
      try {
        const response = await axios.post(ORDER_SERVICE_URL, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Order");
      }
    },
    updateOrder: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${ORDER_SERVICE_URL}/${id}`, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Order");
      }
    },
    deleteOrder: async (_, { id }) => {
      try {
        await axios.delete(`${ORDER_SERVICE_URL}/${id}`);
        return "Order deleted successfully";
      } catch (error) {
        handleServiceError(error, "Order");
      }
    },

    // Payment Mutations
    createPayment: async (_, { input }) => {
      try {
        const response = await axios.post(PAYMENT_SERVICE_URL, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Payment");
      }
    },
    updatePayment: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${PAYMENT_SERVICE_URL}/${id}`, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Payment");
      }
    },
    deletePayment: async (_, { id }) => {
      try {
        await axios.delete(`${PAYMENT_SERVICE_URL}/${id}`);
        return "Payment deleted successfully";
      } catch (error) {
        handleServiceError(error, "Payment");
      }
    },

    // Review Mutations
    createReview: async (_, { input }) => {
      try {
        const response = await axios.post(REVIEW_SERVICE_URL, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Review");
      }
    },
    updateReview: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${REVIEW_SERVICE_URL}/${id}`, input);
        return transformMongoData(response.data);
      } catch (error) {
        handleServiceError(error, "Review");
      }
    },
    deleteReview: async (_, { id }) => {
      try {
        await axios.delete(`${REVIEW_SERVICE_URL}/${id}`);
        return "Review deleted successfully";
      } catch (error) {
        handleServiceError(error, "Review");
      }
    },

    // Room Service Mutations (External GraphQL)
    createRoom: async (_, { input }) => {
      try {
        const mutation = gql`
          mutation CreateRoom($input: RoomInput!) {
            createRoom(input: $input) {
              id
              roomNumber
              roomType
              pricePerNight
              status
            }
          }
        `;
        const data = await request(ROOM_SERVICE_URL, mutation, { input });
        return data.createRoom;
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        throw new Error(`Room service error: ${error.message}`);
      }
    },
    updateRoom: async (_, { id, input }) => {
      try {
        const mutation = gql`
          mutation UpdateRoom($id: Int!, $input: RoomInput!) {
            updateRoom(id: $id, input: $input) {
              id
              roomNumber
              roomType
              pricePerNight
              status
            }
          }
        `;
        const data = await request(ROOM_SERVICE_URL, mutation, { id, input });
        return data.updateRoom;
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        throw new Error(`Room service error: ${error.message}`);
      }
    },
    deleteRoom: async (_, { id }) => {
      try {
        const mutation = gql`
          mutation DeleteRoom($id: Int!) {
            deleteRoom(id: $id)
          }
        `;
        await request(ROOM_SERVICE_URL, mutation, { id });
        return "Room deleted successfully";
      } catch (error) {
        console.error("Room service GraphQL error:", error.message);
        throw new Error(`Room service error: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
