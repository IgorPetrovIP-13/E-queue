"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Ban, CircleCheck, Send, Star } from "lucide-react";
import { formatDate } from "@repo/core/utils/formatDate";
import { Textarea } from "@heroui/input";
import { preSendClear } from "@repo/core/utils/preSendClear";
import { useParams } from "next/navigation";
import { useSocket } from "@repo/core/providers/SocketProvider";
import { SocketEvents } from "@repo/core/constants/socket-events";
import { Comment } from "@repo/api/services/organization-request/organization-request.types";

import { useSendCommentMutation } from "./hooks/useSendCommentMutation";

interface Props {
  initialComments: Comment[];
  rejectionComment: string;
  approvalComment: string;
}

const OrganizationRequestChat: FC<Props> = ({
  initialComments,
  rejectionComment,
  approvalComment
}) => {
  const { id } = useParams();
  const [activeComment, setActiveComment] = useState<string>("");
  const { mutate: mutateSendComment, isPending: isPendingSendComment } =
    useSendCommentMutation();
  const socket = useSocket();

  const [actualComments, setActualComments] =
    useState<Comment[]>(initialComments);

  useEffect(() => {
    if (!id || rejectionComment || approvalComment) {
      return;
    }

    const room = `org_request_${id}`;

    socket.emit("subscribe", { room: room });
    socket.on(SocketEvents.ORGANIZATION_REQUEST_CHAT_COMMENT, msg =>
      setActualComments(prev => [...prev, msg])
    );

    return () => {
      socket.emit("unsubscribe", { room: room });
      socket.off(SocketEvents.ORGANIZATION_REQUEST_CHAT_COMMENT);
    };
  }, [id, socket]);

  return (
    <div className="flex flex-1 w-full flex-col gap-4">
      <p className="text-2xl text-default-400">
        {!rejectionComment && !approvalComment
          ? "Чат з адміністрацією"
          : "Історія чату"}
      </p>
      <div className="max-h-[500px] flex flex-col overflow-auto gap-4 pt-1 pb-1">
        {actualComments.length > 0 ? (
          [...actualComments].reverse().map((comment, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 p-3 ${comment.isAdmin ? "bg-primary-200" : "bg-default-200"} rounded-lg`}
            >
              <div className="flex justify-between">
                <p className="text-sm text-white flex gap-1 leading-none items-center">
                  {comment.isAdmin && <Star size={20} />}
                  {comment.isAdmin ? "Адміністрація" : "Ви"}
                </p>
                <p className="text-sm">{formatDate(comment.createdAt)}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <div className="p-5 flex justify-center bg-cyan-900 rounded-lg">
            {approvalComment || rejectionComment
              ? "Чат залишився пустим"
              : "Чат поки що пустий, зробіть перший крок"}
          </div>
        )}
      </div>
      {!rejectionComment && !approvalComment && (
        <div className="flex flex-col items-end gap-2">
          <Textarea
            label="Коментар"
            value={activeComment}
            onChange={e => setActiveComment(e.target.value)}
          />
          <Button
            className="w-fit"
            color="primary"
            isDisabled={!activeComment || isPendingSendComment}
            startContent={<Send size={16} />}
            onPress={() => {
              const comment = preSendClear({
                activeComment
              }).activeComment;

              if (comment) {
                mutateSendComment({
                  id: id as string,
                  comment: preSendClear({ activeComment }).activeComment
                });
              }
              setActiveComment("");
            }}
          >
            Відправити
          </Button>
        </div>
      )}
      {rejectionComment && (
        <div className="p-3 flex flex-col bg-danger-100 rounded-lg">
          <p className="flex gap-1 text-danger items-center">
            <Ban size={20} />
            Відхилено адміністрацією
          </p>
          <p className="text-lg">{rejectionComment}</p>
        </div>
      )}
      {approvalComment && (
        <div className="p-3 flex flex-col bg-success-200 rounded-lg">
          <p className="flex gap-1 text-success items-center">
            <CircleCheck size={20} />
            Схвалено адміністрацією
          </p>
          <p className="text-lg">{approvalComment}</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationRequestChat;
