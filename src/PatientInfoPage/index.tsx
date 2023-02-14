import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient } from "../types";
import { Box, Typography } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Card } from "@mui/material";



const PatientInfoPage = () => {
    const {id} = useParams();
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
             .then(response => setPatient(response.data))
             .catch((Error) => console.error(Error));
    }, []);

    const GenderIcon = () => {
        switch(patient?.gender) {
            case "male": 
                return <MaleIcon/>; 
            case "female": 
                return <FemaleIcon/>;
            case "other": 
                return <TransgenderIcon/>;
            default: 
                return <TransgenderIcon/>;
        }
    };

    console.log(patient);



    return(
        <div>
            <Box>
                <Typography align="left" variant="h6">
                    {patient?.name} <GenderIcon />
                </Typography>
                <Typography align="left" variant="body1">
                    Occupation: {patient?.occupation}
                </Typography>
                <Typography align="left" variant="body1">
                    ssn: {patient?.ssn}
                </Typography>
                <Typography align="left" variant="h6">
                    entries: 
                </Typography>
                    {patient?.entries.map(entry => 
                        <Card key={entry.id}>
                            <Typography variant="body2">{entry.date}  {entry.description} </Typography>
                            <ul>
                                {entry.diagnosisCodes?.map(diagnosis => <li>{diagnosis}</li>)}
                            </ul>
                        </Card>)}
                  
                
            </Box>

        </div>
    );

};

export default PatientInfoPage;