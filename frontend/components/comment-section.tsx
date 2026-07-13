"use client";

import { useEffect, useState } from "react";
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
import { mockCommentsResponse } from "@/lib/mock-data";

interface CommentUser {
  _id: string;
  name: string;
  role: "student" | "teacher";
  verificationStatus?: "pending" | "verified" | "rejected";
}

interface Comment {
  _id: string;
  comment: string;
  userId: CommentUser;
  createdAt: string;
}

interface CommentsResponse {
  status: string;
  results: number;
  data: Comment[];
}

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
  const [comments, setComments] = useState<Comment[]>(
    mockCommentsResponse.data as Comment[],
  );
  useEffect(() => {
    // UNCOMMENT TO FETCH FROM API
    // const fetchComments = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/materials/${materialId}/comments`);
    //   const json: CommentsResponse = await res.json();
    //   setComments(json.data);
    // };
    // fetchComments();
  }, [materialId]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        _id: `${comments.length + 1}`,
        userId: {
          _id: user?._id ?? "temp",
          name: user?.name ?? "You",
          role:
            user?.role === "teacher" || user?.role === "student"
              ? user.role
              : "student",
          verificationStatus:
            user?.role === "teacher" ? user?.verificationStatus : undefined,
        },
        comment: newComment,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
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

    const previousComments = comments;
    setComments(
      comments.map((c) =>
        c._id === commentId ? { ...c, comment: editText } : c,
      ),
    );
    setEditingCommentId(null);
    setEditText("");

    // UNCOMMENT TO FETCH FROM API
    // try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/${commentId}`, {
    //     method: "PATCH",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ comment: editText }),
    //   });
    //   const json = await res.json();
    //   if (json.status !== "success") throw new Error("Failed to update comment");
    // } catch (err) {
    //   setComments(previousComments);
    // }
  };

  const handleDeleteComment = async (commentId: string) => {
    const previousComments = comments;
    setComments(comments.filter((c) => c._id !== commentId));

    // UNCOMMENT TO FETCH FROM API
    // try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments/${commentId}`, {
    //     method: "DELETE",
    //     credentials: "include",
    //   });
    //   const json = await res.json();
    //   if (json.status !== "success") throw new Error("Failed to delete comment");
    // } catch (err) {
    //   setComments(previousComments);
    // }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);
  const totalComments = 5;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Comments ({totalComments})</h3>

        {isLoggedIn ? (
          <div className="mb-6 space-y-3">
            <Textarea
              placeholder="Share your thoughts about this material..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Log in to comment on this material.
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <Card key={comment._id} className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="text-xs font-medium">
                    {getInitialsFromName(comment.userId.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm flex items-center">
                      {comment.userId.name}
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
