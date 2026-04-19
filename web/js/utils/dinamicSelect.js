export function dinamicSelect(data) {
  if (!data) return;
  let selectOptions = "";

  data.forEach((element) => {
    selectOptions += `
    <option value='${element._id}'>${element.name}</option>
    `;
  });

  return selectOptions;
}
