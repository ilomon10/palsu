// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import faker from "@faker-js/faker";
import { stringToASCII } from "../../components/helper";

function getData(
  seed: number,
  type: "name" | "streetAddress" | "phoneNumber" | "jobType"
) {
  faker.seed(seed);
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
  const seed: string = (req.query?.seed as string) || "palsu";
  let tempSeed = parseInt(stringToASCII(seed).join(""));
  // let tempSeed = stringToASCII(seed).reduce((prev, curr) => curr + prev, 0);
  if (req.query?.limit) delete req.query?.limit;

  const fields: {
    name: any;
    type: any;
  }[] = [];
  for (let [name, type] of Object.entries(req.query)) {
    fields.push({
      name,
      type,
    });
  }
  const result: {
    id: number;
    [key: string]: any;
  }[] = [];
  for (let i = 0; i < limit; i++) {
    let id = tempSeed + i;
    result.push(
      fields.reduce(
        (p, { name, type }) => {
          return {
            ...p,
            [name]: getData(id, type),
          };
        },
        { id }
      )
    );
  }
  res.status(200).json(result);
}
