import React from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from '@mui/icons-material/Facebook';
const Footer = () => {

    // const [value, setValue] = useState({});
    const { setTheme , theme} = useTheme();

    const handleChange = (e) => {
       setTheme(e.value);
      

localStorage.setItem("theme", JSON.stringify(e.value));
    }
    return (
        <div className='footer'>
            <div className="links">
                <a href='https://github.com/komalmeena6516' target='_blank'> <GitHubIcon /> </a>
                <a href='https://www.linkedin.com/in/komalmeena6516/' target='_blank'>  <LinkedInIcon /> </a>
                <a href='https://www.facebook.com/profile.php?id=100035481483240' target='_blank'>  <FacebookIcon /> </a>
            </div>
            <div className="themeButton">

                <Select className='select-btn'
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement='top'
                    defaultValue={{label: theme.label, value: theme}}
                    styles = {{
                        control: (styles, state) => ({...styles,
                             borderColor: state.isFocused ? theme.color : theme.typeBoxtext,
                            backgroundColor: theme.background,
                            color: "white"
                            }),

                        menu: styles =>({...styles, backgroundColor: theme.background }),

                        option : ( styles, {isFocused}) =>{
                            return {
                                ...styles,
                                backgroundColor : (!isFocused) ? theme.background : theme.textColor ,
                                color: (!isFocused) ? theme.textColor : theme.background, 
                                cursor : 'pointer'
                            }
                        }
                    }}
                 />
            </div>
        </div>

    )
}

export default Footer