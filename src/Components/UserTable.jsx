import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTheme } from "../Context/ThemeContext";

const UserTable = ({ data }) => {
    const { theme } = useTheme();

    let tableHeaderStyle = { color: theme.textColor, textAlign: "center", fontWeight: "700", fontSize: "1.2rem" }
    let tableCellStyle = { color: theme.textColor, textAlign: "center", fontSize: "1rem" };

    return (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeaderStyle}>WPM</TableCell>
                            <TableCell style={tableHeaderStyle}>Accuracy</TableCell>
                            <TableCell style={tableHeaderStyle}>Characters (correct/incorrect/missed/extra)</TableCell>
                            <TableCell style={tableHeaderStyle}>TimeStamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {
                            data.map((i, index) => {
                                return <TableRow key={index}>
                                    <TableCell style={tableCellStyle}>{i.wpm}</TableCell>
                                    <TableCell style={tableCellStyle}>{i.accuracy}</TableCell>
                                    <TableCell style={tableCellStyle}>{i.characters}</TableCell>
                                    <TableCell style={tableCellStyle}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserTable;