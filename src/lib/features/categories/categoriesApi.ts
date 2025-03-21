


import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/home/categories",
                method: "GET",
            }),
            providesTags: ["Category"],
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

    }),
});

export const {
    useGetAllCategoriesQuery,
} = categoryApi;
