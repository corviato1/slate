import { runQuery } from "~/node_common/data/utilities";

export default async ({ id, slatename, data }) => {
  const updateObject = { data };

  if (slatename) {
    updateObject.slatename = slatename;
  }

  return await runQuery({
    label: "UPDATE_SLATE_BY_ID",
    queryFn: async (DB) => {
      const response = await DB.from("slates")
        .where("id", id)
        .update(updateObject)
        .returning("*");

      const index = response ? response.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "UPDATE_SLATE",
        source: e,
      };
    },
  });
};
