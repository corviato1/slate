import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "GET_USER_BY_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("users")
        .where({ id })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: "GET_USER_BY_ID",
        source: e,
      };
    },
  });
};
