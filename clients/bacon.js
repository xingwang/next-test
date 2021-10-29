import { extend } from "got";

const baconClient = () => {
  return extend({
    retry: {
      limit: 1,
    }
  });
};

export const getBacon = () => async () => {
  const result = await baconClient()("https://baconmockup.com/300/200");

  return { timing: result.timings.phases.total };
};
