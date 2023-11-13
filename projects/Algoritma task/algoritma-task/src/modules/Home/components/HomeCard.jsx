import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export default function HomeCard(props) {
  const { title, data } = props;

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, color: "#10ad58" }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {data}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
