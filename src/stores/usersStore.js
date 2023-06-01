import { defineStore } from 'pinia';
import { users } from '../utils/users';

export const useUsersStore = defineStore('users', {
  state: () => ({
    nextId: 4,
    users,
    selectedStatus: 'all',
    searchQuery: '',
  }),

  getters: {
    getUserById(state) {
      return (userId) => state.users.find((user) => user.id === userId);
    },

    filteredUsers: (state) => {
      return state.users.filter((user) => {
        const isMatchingQuery =
          user.lastName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          user.firstName
            .toLowerCase()
            .includes(state.searchQuery.toLocaleLowerCase()) ||
          user.companyName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          user.position
            .toLowerCase()
            .includes(state.searchQuery.toLocaleLowerCase());
        const isMatchingStatus =
          state.selectedStatus.toLowerCase() === 'all' ||
          user.status.toLowerCase() === state.selectedStatus.toLowerCase();

        return isMatchingQuery && isMatchingStatus;
      });
    },
  },

  actions: {
    setSearchQuery(value) {
      this.searchQuery = value;
    },

    setSelectedStatus(value) {
      this.selectedStatus = value;
    },
    editUser(userId, updatedUser) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            ...updatedUser,
          };
        }

        return user;
      });
    },

    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },

    updateStatus(userId, status) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status,
          };
        }

        return user;
      });
    },
  },
});
