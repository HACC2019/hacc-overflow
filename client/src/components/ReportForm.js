import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//Report Form for handling error reports, saves in local hook, not currently linked to backend
export default function ReportForm(props) {
    const [open, setOpen] = React.useState(false);
    const [ranking, setRanking] = React.useState(0);
    const [radioValue, setRadioValue] = React.useState('no')
    const [formValues, setFormValues] = React.useState({
        name: props.name,
        ranking: 0,
        radioValue: 'no',
        name: null,
        email: null,
        issues: null
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSliderChange = (event, newValue) => {
        setFormValues({ranking: newValue, radioValue: formValues.radioValue, name: formValues.name, email: formValues.email});
    };
    const handleRadioChange = (event, newValue) => {
        setFormValues({ranking: formValues.ranking, radioValue: newValue, name: formValues.name, email: formValues.email});
    }
    const handleChange = (e) => setFormValues({
        ...formValues,
        [e.target.name]: [e.target.value],
    });
    return(
        <div>
              <Button type="button" onClick={handleOpen}>
                Review Site
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                style={{outline:0, display:'flex', alignItems:'center', justifyContent:'center'}}
              >
                  <Paper>
                        <CardHeader>Station Report Form</CardHeader>
                        <FormControl style={{padding: 15}}>
                            <h2>{props.name}</h2>
                            <TextField placeholder="Name" type="text"  value={formValues.name} onChange={handleChange} required/>
                            <TextField placeholder="Email address" type="email" onblur="this.setAttribute('value', this.value);" value={formValues.email} onChange={handleChange} required/>
                            <span>How would you rank your experience?</span>
                            <Slider
                                value={formValues.ranking}
                                name="ranking"
                                onChange={handleSliderChange}
                            />
                            <span>Did you experience any issues?</span>
                            <RadioGroup name="issues" value={formValues.radioValue} onChange={handleRadioChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="NO" />
                            </RadioGroup>
                            <TextareaAutosize value={formValues.issues} onChange={handleChange} placeholder="Please describe any issues you encountered..." disabled={formValues.radioValue == 'no' ? true : false}/>
                            <Button onClick={handleClose}>Submit</Button>
                        </FormControl>
                    </Paper>
              </Modal>
            </div>
        
    );
}