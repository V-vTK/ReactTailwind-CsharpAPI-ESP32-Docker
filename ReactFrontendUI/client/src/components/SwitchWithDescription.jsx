import { Switch, Typography } from "@material-tailwind/react";
 
export function SwitchWithDescription({text, desc, onChange}) {
  return (
    <Switch
      label={
        <div>
          <Typography color="blue-gray" className="font-medium">
            {text ? 'Card layout' : 'Graph layout'}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {desc}
          </Typography>
        </div>
      }
      containerProps={{
        className: "-mt-5",
      }}
      onChange={onChange}
    />
  );
}