import React, { Fragment, useState } from 'react'
import {
    Box,
    OutlinedInput,
    TextField,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const modalStyles = {
    inputFields: {
        display: "flex",
        flexDirection: "column",
        //   marginTop: "5px",
        //   marginBottom: "5px",
        ".MuiFormControl-root": {
            // marginBottom: "20px",
        },
    },
};

type Props = {
    PROPS: {
        value?: string,
        name: string,
        label: string,
        required: boolean,
        disabled: boolean,
        multiline: boolean,
        type: string,
        fieldType: "INPUT" | "DROPDOWN",
        menuItems?: string[],
        isCountryDB?: boolean
    }
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => void
}

const FormFields = (props: Props) => {
    const theme = useTheme();
    const [countryName, setcountryName] = useState<any>("")
    
    const getRegions = (countryName: string) => {
        let countryRegionData: any = [""];
        props.PROPS.menuItems && props.PROPS.menuItems.forEach(element => {

            if (element[0] === countryName) {
                countryRegionData = element;
            }

        });
        // console.log("getRegions.countryRegionData--->", countryRegionData[0]);
        let stateName = countryRegionData[2]?.split("|")?.map((regionPair: any) => {
            let [regionName, regionShortCode = null] = regionPair.split("~");
            if (countryName.toLowerCase() === "thailand" && regionName === "Krung Thep Mahanakhon (Bangkok)") {
                regionName = 'Bangkok'
            }
            return regionName;
        });

        if (countryName.toLowerCase() === "thailand") {
            stateName.sort()
        }
        return stateName || []
    };

    return (
        <Box sx={modalStyles.inputFields}>
            {
                props.PROPS.fieldType.toLocaleUpperCase() === "INPUT" && (
                    <TextField
                        margin='normal'
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={props.PROPS.value}
                        name={props.PROPS.name}
                        label={props.PROPS.label}
                        value={props.PROPS.value}
                        type={props.PROPS.type}
                        required={props.PROPS.required}
                        disabled={props.PROPS.disabled}
                        multiline={props.PROPS.multiline}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.handleChange(event)
                        }}
                    />
                )
            }

            {
                props.PROPS.fieldType.toLocaleUpperCase() === "DROPDOWN" && (
                    <FormControl sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
                        <InputLabel id="demo-multiple-name-label">{props.PROPS.label}</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // value={props.PROPS.value}
                            defaultValue=''
                            required={props.PROPS.required}
                            disabled={props.PROPS.disabled}
                            name={props.PROPS.name}
                            onChange={(event: SelectChangeEvent<string>) => {
                                props.handleChange(event)
                            }}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {props.PROPS.menuItems && props.PROPS.menuItems.map((name: string) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, props.PROPS.menuItems || [], theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            }

            {
                props.PROPS.fieldType.toLocaleUpperCase() === "COUNTRY_REGION_DROPDOWN" && (
                    <Fragment>
                        <FormControl sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
                            <InputLabel id="demo-multiple-name-label">{props.PROPS.label}</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                // value={props.PROPS.value}
                                defaultValue=''
                                required={props.PROPS.required}
                                disabled={props.PROPS.disabled}
                                name={props.PROPS.name}
                                onChange={(event: SelectChangeEvent<string>) => {
                                    props.handleChange(event)
                                    setcountryName(event.target.value)
                                }}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {props.PROPS.menuItems && props.PROPS.menuItems.map((name: string) => (
                                    <MenuItem
                                        key={props.PROPS.isCountryDB ? name[0] : name}
                                        value={props.PROPS.isCountryDB ? name[0] : name}
                                        style={getStyles(name, props.PROPS.menuItems || [], theme)}
                                    >
                                        {props.PROPS.isCountryDB ? name[0] : name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
                            <InputLabel id="demo-multiple-name-label">{'Company HQ Region'}</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                // value={props.PROPS.value}
                                defaultValue=''
                                required={props.PROPS.required}
                                disabled={props.PROPS.disabled}
                                name={'companyHQRegion'}
                                onChange={(event: SelectChangeEvent<string>) => {
                                    props.handleChange(event)
                                }}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {getRegions(countryName).map((name: string) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, props.PROPS.menuItems || [], theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Fragment>

                )
            }

            {
                //     <FormControl
                //     variant="outlined"
                //     className={classes.formControl}
                //     style={{ width: "100%" }}
                //   >
                //     <InputLabel id="residentialCountry">
                //       Residential Country
                //     </InputLabel>
                //     <Select
                //       labelId="residentialCountry"
                //       id="residentialCountry"
                //       autoComplete="none"
                //       value={residentialCountry.value}
                //       defaultValue="United States"
                //       onChange={handleChange}
                //       error={!!residentialCountry.error}
                //       helperText={residentialCountry.error}
                //       required={residentialCountry.required}
                //       label="Residential Country"
                //       name="residentialCountry"
                //     >
                //       {CountryRegionData.map((option, index) => (
                //         <MenuItem key={option[0]} value={option[0]}>
                //           {option[0]}
                //         </MenuItem>
                //       ))}
                //     </Select>
                //   </FormControl>

                //   <Grid item xs={12} sm={12} sx={{ marginTop: 1 }}>
                //     <TextField
                //       margin={margin}
                //       fullWidth
                //       label="Residential City"
                //       name="residentialCity"
                //       placeholder="Enter first name"
                //       value={residentialCity.value}
                //       onChange={handleChange}
                //       error={!!residentialCity.error}
                //       helperText={residentialCity.error}
                //       required={residentialCity.required}
                //     />
                //   </Grid>

                //   <FormControl
                //     variant="outlined"
                //     className={classes.formControl}
                //     style={{ width: "100%" }}
                //   >
                //     <InputLabel id="state">
                //       State *
                //     </InputLabel>
                //     <Select
                //       labelId="state"
                //       id="selectRegion"
                //       value={state?.value}
                //       // autoComplete="none"
                //       onChange={handleChange}
                //       label="state"
                //       name="state"
                //       // required
                //       required={state?.required}
                //     >
                //       {getRegions(residentialCountry?.value).map(
                //         (option, index) => (
                //           <MenuItem key={option} value={option}>
                //             {option}
                //           </MenuItem>
                //         )
                //       )}
                //     </Select>
                //   </FormControl>
            }
        </Box>
    )
}


export default FormFields

// ! REquired Elements.
// ! import elements
// import { SelectChangeEvent } from "@mui/material"

// const navigate = useNavigate()
// const [values, setvalues] = useState<any>([])
// const [errorMsg, seterrorMsg] = useState<string>('')
// const [isLoading, setisLoading] = useState<boolean>(false)
// const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>): void => {
//     const { name, value } = e.target;
//     errorMsg !== '' && seterrorMsg('')
//     setvalues({
//         ...values,
//         [name]: value,
//     });
// }

// const inputFieldValues = [
//     {
//         fieldType: "DROPDOWN",
//         name: "i_am",
//         label: "I am",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false,
//         menuItems: [
//             'Benefits Broker', 'Employer', 'Membership Organization'
//         ]
//     },
//     {
//         fieldType: "INPUT",
//         name: "email",
//         label: "Your Email Address",
//         type: "email",
//         required: true,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "INPUT",
//         defaultValue: "",
//         name: "employerGroup",
//         label: "Your Employer / Group",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "INPUT",
//         defaultValue: "",
//         name: "companyUrl",
//         label: "Your Company's URL (optional)",
//         type: "text",
//         required: false,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "INPUT",
//         defaultValue: "",
//         name: "firstName",
//         label: "Your First Name",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "INPUT",
//         defaultValue: "",
//         name: "lastName",
//         label: "Your Last Name",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "INPUT",
//         defaultValue: "",
//         name: "phoneNumber",
//         label: "Phone Number",
//         type: "number",
//         required: true,
//         disabled: false,
//         multiline: false
//     },
//     {
//         fieldType: "DROPDOWN",
//         name: "companySize",
//         label: "Company Size",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false,
//         menuItems: [
//             '0-10', '10-50', '50-200', '200-1000'
//         ]
//     },
//     {
//         fieldType: "DROPDOWN",
//         name: "companyHQProvince",
//         label: "Company HQ Province",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false,
//         menuItems: [
//             '0-10', '10-50', '50-200', '200-1000'
//         ]
//     },
//     {
//         fieldType: "DROPDOWN",
//         name: "isDiscountProgram",
//         label: "Already Have a Discount Program?",
//         type: "text",
//         required: true,
//         disabled: false,
//         multiline: false,
//         menuItems: [
//             'Yes we use Deeperks', 'Yes, But we are interested in switching provides', 'No'
//         ]
//     },
// ];

// const isValidate = () => {
//     if (
//         values.isDiscountProgram !== undefined &&
//         values.companyHQProvince !== undefined &&
//         values.companySize !== undefined &&
//         values.phoneNumber !== undefined &&
//         values.lastName !== undefined &&
//         values.firstName !== undefined &&
//         values.employerGroup !== undefined &&
//         values.email !== undefined &&
//         values.i_am !== undefined
//     ) {
//         return true
//     }
//     else return false
// }

// const handleFormSubmit = async () => {
//     setisLoading(true)
//     if (isValidate()) {
//         try {
//             // api call here for DP_BRANDS
//             let response = await setQuery(DB_COLLECTION.DP_COMPANIES, values, "company_id");
//             alert('Join Successfully!')
//             navigate(ROUTES.HOME)
//         } catch (error: any) {
//             seterrorMsg('Something went wrong. Please try again')
//             setisLoading(false)
//         }

//     }
//     else {
//         seterrorMsg('Please Enter required fields.')
//         setisLoading(false)
//     }
// }