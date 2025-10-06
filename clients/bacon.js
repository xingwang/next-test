import { got } from "got";

const baconClient = () => {
  return got.extend({
    retry: {
      limit: 1,
    },
  });
};

export const getBacon = () => async () => {
  const result = await baconClient()("https://baconmockup.com/300/200");

  // Handle different timing structures between got versions
  const timing = result.timings?.phases?.total || result.timings?.total || 0;
  return { timing };
};
