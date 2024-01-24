import React from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addOrUpdatedToBookmark,
  getBookmark,
  removeFromBookmark,
} from "../api/firebase";

export default function useBookmark() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const bookmarkQuery = useQuery(
    ["bookmark", uid || ""],
    () => getBookmark(uid),
    { enabled: !!uid }
  );

  const addOrUpdatedBookMark = useMutation(
    (bookmark) => addOrUpdatedToBookmark(uid, bookmark),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmark", uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromBookmark(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmark", uid]);
    },
  });

  return { bookmarkQuery, addOrUpdatedBookMark, removeItem };
}
