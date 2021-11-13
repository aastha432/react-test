import { Card, CardHeader, Alert } from '@mui/material';

export default function AppCurrentSubject(props) {
  //const { data } = props;

  return (
    <Card>
      <CardHeader title="Current Subject" />
      <Alert severity="info">{props.toString()}</Alert>
    </Card>
  );
}
