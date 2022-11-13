import { Button as Btn } from "@mui/material"

export const Button = ({ label, disabled = false }) => (
    <Btn disabled={disabled} variant="contained" type="submit">
        {label}
    </Btn>
)