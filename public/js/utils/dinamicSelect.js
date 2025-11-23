export function dinamicSelect(data){
  let selectOptions='';

  data.forEach(element => {
    selectOptions+=`
    <option value='${element._id}'>${element.name}</option>
    `
  });

  return selectOptions;
}