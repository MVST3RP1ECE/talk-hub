"use client";
import ActiveRooms from "@/components/AppComponents/ClientComponents/activeRoomsList";
import SetUserName from "@/components/AppComponents/ClientComponents/setUserName";
import { ModeToggle } from "@/components/ui/toggle-mode-theme";
import useSocket from "@/hooks/useSocket";
import { setCreatedRooms, TCreatedRooms, TCreateRoomState } from "@/store/slices/createRoomSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const socket = useSocket();
  // console.log(socket);

  if (!socket) return null;
  const dispatch = useDispatch();
  const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);
  console.log(socket.id);


  useEffect(() => {
    // Прослушивание на наличие комнат (для новых сокетов)
    socket.on("check-rooms", (data: TCreatedRooms[]) => {
      dispatch(setCreatedRooms(data));
    });

    // Прослушиваем событие создания комнаты, принимаем инфу с сервера если
    // создана новая комната
    socket.on("room-created", (data: TCreateRoomState) => {
      dispatch(setCreatedRooms(Array(data)));
      console.log(createdRooms);

    });

    socket.on("room-closed", (data: TCreatedRooms) => {
      console.log("ROOM IS CLOSED -", data);
      // dispatch(setCreatedRooms(data => data.filter))
    });

    return () => {
      // socket покинул приложение (закрыл вкладку, поймал 404 ошибку)
      socket.off();
      socket.on("disconnect", () => {
        console.log("disconnected from app");
      });
    }

  }, [createdRooms]);

  return (
    <section className="flex items-center justify-center flex-col gap-2 h-screen w-screen">
      <SetUserName />
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
      <ModeToggle />
    </section>
  );
}
