import React from "react";
import {
  Card,
  Container,
  Stack,
  Button,
  TextField,
  Grid2,
} from "@mui/material";
import { showSmallLoader, hideSmallLoader } from "../helpers";
import { error, success } from "../utils/showToast";
import api from "../utils/api";
import { RoomType } from "../interfaces";
import Rooms from "../components/Rooms";

const HotelDesign = () => {
  const [rooms, setRooms] = React.useState<number | "">("");
  const [roomData, setRoomData] = React.useState<RoomType[][]>([]);

  const handleBookRoom = () => {
    if (rooms === "" || rooms === 0)
      return error("Please select number of rooms");

    if (rooms < 0) return error("You can't book negative rooms");
    if (rooms > 5) return error("You can book maximum 5 rooms");

    showSmallLoader();
    api
      .post("book-room", { number: rooms })
      .then((res: any) => {
        success(res.msg);
      })
      .catch((err) => {
        error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        hideSmallLoader();
        setRooms("");

        loadRooms();
      });
  };

  const loadRooms = () => {
    showSmallLoader();
    api
      .get("get-all-rooms")
      .then((res) => {
        const data = res.data as RoomType[][];
        data.reverse();
        setRoomData(data);
      })
      .catch((err) => {
        error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        hideSmallLoader();
      });
  };

  const handleReset = () => {
    showSmallLoader();
    api
      .patch("reset-rooms")
      .then((res: any) => {
        success(res.msg);
      })
      .catch((err) => {
        error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        hideSmallLoader();
        loadRooms();
      });
  };

  const handleRandom = () => {
    showSmallLoader();
    api
      .patch("random-rooms")
      .then((res: any) => {
        success(res.msg);
      })
      .catch((err) => {
        error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        hideSmallLoader();
        loadRooms();
      });
  };

  React.useEffect(() => {
    loadRooms();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              label="Number of Rooms"
              type="number"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              size="small"
              sx={{ width: 170 }}
              slotProps={{ htmlInput: { min: 0, max: 5 } }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleBookRoom}
            >
              Book Room
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleRandom}
            >
              Random
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          <Card variant="stair" />
        </Grid2>
        <Grid2 size={{ xs: 9 }}>
          <Stack spacing={2}>
            {roomData.map((floor, index) => (
              <Rooms key={index} rooms={floor} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HotelDesign;
