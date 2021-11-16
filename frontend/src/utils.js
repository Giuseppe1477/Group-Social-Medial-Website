
const handleFilter = (filter, val, setFilter) => {
  console.log({setFilter})
    if (filter.includes(val.tag)) {
        const filterIndex = filter.indexOf(val.tag);
        const newFilter = [ ...filter ];
        newFilter.splice(filterIndex,1);
        setFilter(newFilter)
    } else setFilter([ ...filter, val.tag ]);
}

const checkIfImageExists = (url, callback) => {
   const img = new Image();

   img.src = url;

   if (img.complete) {
     callback(true);
   } else {
     img.onload = () => {
       callback(true);
     };

     img.onerror = () => {
       callback(false);
     };
   }
 }


export {
  handleFilter,
  checkImage
}
