import { iField } from "../../pages"
import _get from "lodash.get"

interface props {
  fields: iField[];
  data: any
}


export const exportToCSV = ({
  fields,
  data
}: props) => {
  let csvContent = "data:text/csv;charset=utf-8,";

  for (let i = -1; i < data.length; i++) {
    let result;
    if (i < 0) {
      result = fields.map(({ label }) => {
        return label
      });
    } else {
      result = fields.map(({ name }) => {
        return _get(data[i], name);
      });
    }
    csvContent += result.join(";") + "\r\n";
  }

  let encodedUri = encodeURI(csvContent);

  let link = document.createElement("a");

  let fileName = fields.map(({ label }) => {
    return label
  }).join(" - ");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `[Data Palsu] ${fileName}`);

  link.click();

}