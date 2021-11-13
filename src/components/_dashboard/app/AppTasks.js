import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// ----------------------------------------------------------------------

const TASKS = [
  { id : "1",
    value : "Create FireStone Logo"
  },
  { id : "2",
    value : "Create FireStone Logo"
  },
  { id : "3",
    value : "Create FireStone Logo"
  },
  { id : "4",
    value : "Create FireStone Logo"
  },
  { id : "5",
    value : "Create FireStone Logo"
  }
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <div></div>
      <FormControlLabel
        control={
          <Checkbox {...getFieldProps('checked')} value={task} checked={checked} {...other} />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through'
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const [input,setInput] = useState("");
  const { values, handleSubmit } = formik;


  function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '65ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Input Task" variant="outlined" value={input} onChange={(e)=> setInput(e.target.value)}/>
      </Box>
    );
  }

  function handleInputSubmit() {
    const Nnew = {
      id : Math.random(),
      value : input
    }
    console.log(input);
    TASKS.push(Nnew);
    setInput(...input,"");
  }

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <BasicTextFields/>
          <Button variant="contained" onClick={handleInputSubmit}>Submit</Button>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {TASKS.map((task) => (
              <div key={task.id}>
              <TaskItem
                
                task={task.value}
                formik={formik}
                checked={values.checked.includes(task)}
              /></div>
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
