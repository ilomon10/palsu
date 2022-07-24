export interface iField {
  label: string;
  name: string;
  contains: string;
}

export const useClient = () => {
  function url(
    fields: iField[],
    limit: string | number = "1000",
    seed: string = ""
  ): URL {
    const url = new URL(`${window.location.origin}/api/generate`);
    const params = fields?.map(({ contains, name }) => [name, contains]);
    params.push(["limit", limit.toString()]);
    params.push(["seed", seed]);
    url.search = new URLSearchParams(params).toString();
    return url;
  }
  async function get(
    fields: iField[],
    limit: string | number = "1000",
    seed: string = ""
  ) {
    const res = await (
      await fetch(url(fields, limit, seed).toString(), {
        method: "GET",
      })
    ).json();
    return res;
  }
  return {
    get,
    url,
  };
};
