import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import styles from "./styles.module.scss";
import { Fab } from "@mui/material";

export default function MediaCard({ title, description, setMode }) {
  return (
    <div className={styles.wrapper}>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWpqamhHEfZAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ gap: "10px" }}>
          <Fab size="small" >
            <PlayArrowIcon/>
          </Fab>

          <Fab size="small"  onClick={() => setMode(1)}>
            <EditIcon />
          </Fab>

          <Fab size="small" >
            <OpenInNewIcon />
          </Fab>
        </CardActions>
      </Card>
    </div>
  );
}
