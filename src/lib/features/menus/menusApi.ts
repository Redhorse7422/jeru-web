


import { baseApi } from "../../api/baseApi";

const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMenus: builder.query({
            query: () => ({
                url: "/home/menus",
                method: "GET",
            }),
            providesTags: ["Menu"],
            // Add this to debug
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    // console.log("API Response:", result);
                } catch (error) {
                    console.error("API Error:", error);
                }
            },
        }),
        getMenuById: builder.query({
            query: (id) => ({
                url: `/home/menu-details/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Menu", id }],
        }),

    }),
});

export const {
    useGetAllMenusQuery,
    useGetMenuByIdQuery,
} = menuApi;
