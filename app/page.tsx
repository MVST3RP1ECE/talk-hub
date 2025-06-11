"use client";
import ActiveRooms from "@/components/AppComponents/ClientComponents/activeRoomsList";
import { ModeToggle } from "@/components/ui/toggle-mode-theme";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io(`http://localhost:1111`);

export default function Home() {

  const dispatch = useDispatch();
  const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);

  // socket.on("room-created", (createdRooms: ) => {
  // TODO: дописать компонент для отслеживания созданных и активных комнат
  // })

  console.log("NOT IN USEEFFECT", createdRooms);

  useEffect(() => {
    console.log("IN USEEFFECT", createdRooms);

  }, [createdRooms]);

  return (
    <section className="flex items-center justify-center flex-col gap-2 h-screen w-screen">
      <div className="flex items-center justify-center w-1/2 h-1/2 bg-background border-2 border-border rounded-md">
        <div className="flex w-full h-1/2 rounded-md justify-around">
          <Link
            href={"/create-room"}
            className="flex w-1/4 text-center text items-center justify-center bg-muted rounded-md border-2 
            hover:text-primary transition-colors"
          >
            Создать комнату
          </Link>
          <Link
            href={"/room"}
            className="flex w-1/4 text-center items-center justify-center bg-muted rounded-md border-2 
            hover:text-secondary transition-colors"
          >
            Войти в комнату
          </Link>

          <Link
            href={"/booking-room"}
            className="flex w-1/4 text-center items-center justify-center bg-muted rounded-md border-2 
            hover:text-accent transition-colors"
          >
            Запланировать встречу
          </Link>
        </div>
      </div>
      {
        createdRooms.length > 0 && <ActiveRooms />
      }
      <ActiveRooms />

      <ModeToggle />
    </section>
  );
}
