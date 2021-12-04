import { FormControlLabel, Checkbox } from "@mui/material";


const Filters = props => {



  return (
      <div className="filters">
          {props.filterList.map((f, i) =>
            <div className="tag">
                <FormControlLabel
                    control={<Checkbox
                        onChange={props.onChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        value={f.tag}
                    />}
                    label={f.tag}
                />
            </div>
            )}
      </div>
  )
}

export default Filters
