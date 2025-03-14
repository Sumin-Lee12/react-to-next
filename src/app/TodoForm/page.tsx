"use client";

import { TodoContent } from "../todolist/page";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoForm({id, isCompleted, imgPath, createdAt}) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`Failed to post todo`);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo:TodoContent[] = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      imgPath: "https://picsum.photos/250/250",
      createdAt: Date.now(),
    });
  };
}
