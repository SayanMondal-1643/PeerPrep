"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/lib/hooks/use-comments";
import { Comment } from "@/lib/comment-types";

interface CommentSectionProps {
  materialId: string;
  isLoggedIn: boolean;
}

const getInitialsFromName = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export function CommentSection({
  materialId,
  isLoggedIn,
}: CommentSectionProps) {
  const { user } = useAuth();
  const { data, isLoading, isError } = useComments(materialId);
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const comments: Comment[] = data?.data ?? [];

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment.mutateAsync({ materialId, comment: newComment });
      setNewComment("");
    } catch {
      // leave the draft in place if submission fails
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.comment);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editText.trim()) return;

    try {
      await updateComment.mutateAsync({
        commentId,
        comment: editText,
        materialId,
      });
    } finally {
      setEditingCommentId(null);
      setEditText("");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment.mutateAsync({ commentId, materialId });
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Comments ({comments.length})</h3>

        {isLoggedIn ? (
          <div className="mb-6 space-y-3">
            <Textarea
              placeholder="Share your thoughts about this material..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
              disabled={createComment.isPending}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || createComment.isPending}
              size="sm"
            >
              {createComment.isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Log in to comment on this material.
            </p>
          </div>
        )}

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        )}
        {isError && (
          <p className="text-sm text-destructive">Failed to load comments.</p>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <Card key={comment._id} className="p-4">
              <div className="flex gap-4">
                <Link
                  href={`/profile/${comment.userId._id}`}
                  className="shrink-0"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs font-medium">
                      {getInitialsFromName(comment.userId.name)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm flex items-center">
                      <Link
                        href={`/profile/${comment.userId._id}`}
                        className="hover:underline"
                      >
                        {comment.userId.name}
                      </Link>
                      {comment.userId.role === "teacher" &&
                        comment.userId.verificationStatus === "verified" && (
                          <GraduationCap className="h-4 w-4 text-blue-600 ml-1" />
                        )}
                    </p>
                    {comment.userId._id === user?._id && (
                      <div className="flex items-center gap-2 text-xs text-primary">
                        {editingCommentId === comment._id ? null : (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleStartEdit(comment)}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit comment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-destructive shadow-sm transition hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete comment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {comment.userId._id === user?._id &&
                  editingCommentId === comment._id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-24"
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleSaveEdit(comment._id)}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {comment.comment}
                      </p>
                      <div className="text-right text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* See all comments button */}
        {!showAllComments && comments.length > 3 && (
          <Button
            variant="ghost"
            onClick={() => setShowAllComments(true)}
            className="mt-4 w-full"
          >
            See all comments
          </Button>
        )}
      </div>
    </div>
  );
}
