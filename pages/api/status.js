import { getBacon } from "../../clients/bacon";

const clients = [
  { name: "Bacon", client: getBacon()},
];

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await Promise.allSettled(clients.map(c => c.client ? c.client() : c));
      const clientResult = result.map((r, index) => {
        return {
          ...r,
          message: r.reason ? r.reason.message : undefined,
          name: clients[index].name,
        };
      });
      return res.status(200).json(clientResult);
    }
    return res.status(404).json();
  } catch (err) {
    console.log(err, 'status error');
    throw err;
  }
}
