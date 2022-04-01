// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import faker from "@faker-js/faker";

function getData(type: "name" | "streetAddress" | "phoneNumber" | "jobType") {
  switch (type) {
    case "name":
      return faker.name.findName();
    case "streetAddress":
      return faker.address.streetAddress();
    case "phoneNumber":
      return faker.phone.phoneNumber("(+62) 8##-####-####");
    case "jobType":
      return faker.name.jobType();
    default:
      return null;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const limit = req.query?.limit || 10;
  if (req.query?.limit) delete req.query?.limit;

  const fields: {
    name: any,
    type: any
  }[] = [];
  for (let [name, type] of Object.entries(req.query)) {
    fields.push({
      name, type
    });
  }
  const result: any[] = [];
  for (let i = 0; i < limit; i++) {
    result.push(fields.reduce((p, { name, type }) => {
      return {
        ...p,
        [name]: getData(type),
      }
    }, {}));
  }
  res.status(200).json(result);
}
