import React from "react";
import { Card, Stack } from "@mui/material";
import { RoomType } from "../interfaces";

interface RoomsProps {
  rooms: RoomType[];
}

const Rooms = ({ rooms }: RoomsProps) => {
  return (
    <Stack direction="row" spacing={2}>
      {rooms.map((room) => (
        <Card key={room._id} variant={room.isBooked ? "filled" : "available"}>
          {room.roomNumber}
        </Card>
      ))}
    </Stack>
  );
};

export default Rooms;
