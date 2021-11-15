
const handleFilter = (filter, val, setFilter) => {
  console.log({setFilter})
    if (filter.includes(val.tag)) {
        const filterIndex = filter.indexOf(val.tag);
        const newFilter = [ ...filter ];
        newFilter.splice(filterIndex,1);
        setFilter(newFilter)
    } else setFilter([ ...filter, val.tag ]);
}

export {
  handleFilter
}
