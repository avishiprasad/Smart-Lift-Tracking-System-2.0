"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { queryClient } from "@/lib/queryClient";

export default function SocketProvider() {
  useEffect(() => {
    const socket = getSocket();

    socket.connect();

    socket.on("connect", () => {
      console.log(
        "FRONTEND CONNECTED:",
        socket.id
      );
    });

    socket.on("liftUpdated", (lift) => {
      console.log(
        "LIVE UPDATE",
        lift.liftNumber,
        lift.currentFloor
      );

      queryClient.setQueryData(
        ["lifts"],
        (old: any[] = []) => {
      
          const index =
            old.findIndex(
              (l) => l._id === lift._id
            );
      
          if (index === -1) {
            return [...old, lift];
          }
      
          const updated = [...old];
      
          updated[index] = lift;
      
          return updated;
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    });

    socket.on("requestCreated", () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}