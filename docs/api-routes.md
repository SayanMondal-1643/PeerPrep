# PeerPrep API Documentation

# Exams

## GET `/api/v1/exams`

Get all exams.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Maulana Abul Kalam Azad University of Technology"
    }
  ]
}
```

---

## POST `/api/v1/exams`

Create an exam.

### Request Body

```json
{
  "name": "Jadavpur University"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Jadavpur Univerisity"
  }
}
```

---

## PATCH `/api/v1/exams/:examID`

Update an exam.

### Request Body

```json
{
  "name": "MAKAUT Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "MAKAUT Updated"
  }
}
```

---

## DELETE `/api/v1/exams/:examID`

Delete an exam.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Branches

## GET `/api/v1/exams/:examID/branches`

Get all branches under an exam.

### Response

```json
{
  "status": "success",
  "exam": "MAKAUT",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Computer Science Engineering"
    }
  ]
}
```

> `exam` is the parent exam's name, included so the frontend can build a breadcrumb without an extra call.

---

## POST `/api/v1/exams/:examID/branches`

Create a branch under an exam.

### Request Body

```json
{
  "name": "Information Technology"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Information Technology"
  }
}
```

---

## PATCH `/api/v1/branches/:branchID`

Update a branch.

### Request Body

```json
{
  "name": "Computer Science Engineering Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Computer Science Engineering Updated"
  }
}
```

---

## DELETE `/api/v1/branches/:branchID`

Delete a branch.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Subjects

## GET `/api/v1/branches/:branchID/subjects`

Get all subjects under a branch.

### Response

```json
{
  "status": "success",
  "exam": "MAKAUT",
  "branch": "Computer Science Engineering",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Data Structures & Algorithms"
    }
  ]
}
```

---

## POST `/api/v1/branches/:branchID/subjects`

Create a subject under a branch.

### Request Body

```json
{
  "name": "Database Management Systems"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Database Management Systems"
  }
}
```

---

## PATCH `/api/v1/subjects/:subjectID`

Update a subject.

### Request Body

```json
{
  "name": "Data Structures & Algorithms Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Data Structures & Algorithms Updated"
  }
}
```

---

## DELETE `/api/v1/subjects/:subjectID`

Delete a subject.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Topics

## GET `/api/v1/subjects/:subjectID/topics`

Get all topics under a subject.

### Response

```json
{
  "status": "success",
  "exam": "Maulana Abul Kalam Azad University of Technology",
  "branch": "Computer Science Engineering",
  "subject": "Data Structures & Algorithms",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Array"
    }
  ]
}
```

---

## POST `/api/v1/subjects/:subjectID/topics`

Create a topic under a subject.

### Request Body

```json
{
  "name": "Linked List"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Linked List"
  }
}
```

---

## PATCH `/api/v1/topics/:topicID`

Update a topic.

### Request Body

```json
{
  "name": "Array Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Array Updated"
  }
}
```

---

## DELETE `/api/v1/topics/:topicID`

Delete a topic.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Materials

> Every endpoint below returns the **full material object** — same shape regardless of which endpoint served it. `userId` is always populated as `{ _id, name, role }`, never a bare string. List endpoints always use the `data` key (never `materials`).

## GET `/api/v1/materials`

Get all materials.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "title": "Complete Array Problems Guide",
      "description": "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
      "fileUrl": "https://example.com/file1.pdf",
      "uploadDate": "2026-06-05",
      "status": "approved",
      "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
      "topicId": "1",
      "isBestMaterial": false,
      "isTopperMaterial": false,
      "isAIPicked": false,
      "ratingsAverage": 4.8,
      "ratingsQuantity": 245
    }
  ]
}
```

---

## GET `/api/v1/topics/:topicID/materials`

Get all materials under a topic.

### Response

```json
{
  "status": "success",
  "exam": "MAKAUT",
  "branch": "Computer Science Engineering",
  "subject": "Data Structures & Algorithms",
  "topic": "Array",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "title": "Complete Array Problems Guide",
      "description": "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
      "fileUrl": "https://example.com/file1.pdf",
      "uploadDate": "2026-06-05",
      "status": "approved",
      "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
      "topicId": "1",
      "isBestMaterial": false,
      "isTopperMaterial": false,
      "isAIPicked": false,
      "ratingsAverage": 4.8,
      "ratingsQuantity": 245
    }
  ]
}
```

> `exam`/`branch`/`subject`/`topic` are the resolved parent-chain names, included for breadcrumbs — same convention as the branch/subject/topic list endpoints. These extra fields are the only difference from the plain `GET /api/v1/materials` response.

---

## GET `/api/v1/materials/:materialID`

Get a single material.

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "title": "Complete Array Problems Guide",
    "description": "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
    "fileUrl": "https://example.com/file1.pdf",
    "uploadDate": "2026-06-05",
    "status": "approved",
    "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
    "topicId": "1",
    "isBestMaterial": true,
    "isTopperMaterial": false,
    "isAIPicked": true,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 245
  }
}
```

---

## POST `/api/v1/topics/:topicID/materials`

Create a material under a topic.

### Request Body

```json
{
  "title": "Array Algorithms Cheat Sheet",
  "description": "Quick reference for sorting, searching, and sliding window patterns",
  "fileUrl": "https://example.com/file2.pdf"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "title": "Array Algorithms Cheat Sheet",
    "description": "Quick reference for sorting, searching, and sliding window patterns",
    "fileUrl": "https://example.com/file2.pdf",
    "uploadDate": "2026-06-12",
    "status": "pending",
    "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
    "topicId": "1",
    "isBestMaterial": false,
    "isTopperMaterial": false,
    "isAIPicked": false,
    "ratingsAverage": 0,
    "ratingsQuantity": 0
  }
}
```

---

## PATCH `/api/v1/materials/:materialID`

Update a material.

### Request Body

```json
{
  "status": "approved"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "title": "Array Algorithms Cheat Sheet",
    "description": "Quick reference for sorting, searching, and sliding window patterns",
    "fileUrl": "https://example.com/file2.pdf",
    "uploadDate": "2026-06-12",
    "status": "approved",
    "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
    "topicId": "1",
    "isBestMaterial": false,
    "isTopperMaterial": false,
    "isAIPicked": false,
    "ratingsAverage": 0,
    "ratingsQuantity": 0
  }
}
```

---

## DELETE `/api/v1/materials/:materialID`

Delete a material.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Ratings

## POST `/api/v1/materials/:materialID/ratings`

Rate a material.

### Request Body

```json
{
  "ratingValue": 5
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "ratingValue": 5,
    "ratingsAverage": 5,
    "ratingsQuantity": 1
  }
}
```

---

# Reports

## GET `/api/v1/reports`

Get all reports.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "materialId": "1",
      "materialTitle": "Sorting Techniques",
      "reporter": { "_id": 1, "name": "Sayan Mondal", "role: "student" },
      "reportReason": "Incorrect content",
      "comment": "Binary search can't be done on unsorted arrays",
      "reportDate": "2026-06-13",
      "status": "reviewed",
    }
  ]
}
```

---

## POST `/api/v1/materials/:materialID/reports`

Report a material.

### Request Body

```json
{
  "reportReason": "Incorrect content",
  "comment": "Binary search description is wrong"
}
```

### Response

```json
{
  "status": "success",
  "message": "Report submitted successfully"
}
```

---

## PATCH `/api/v1/reports/:reportID`

Update report status.

### Request Body

```json
{
  "status": "reviewed"
}
```

### Response

```json
{
  "status": "success",
  "message": "Status updated successfully"
}
```

---

## DELETE `/api/v1/reports/:reportID`

Delete a report.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Comments

## GET `/api/v1/materials/:materialID/comments`

Get all comments under a material.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "comment": "This guide covers all the array topics that appeared in last year's MAKAUT exam! The two-pointer technique section was especially helpful. Wish I had found this earlier",
      "userName": "Sayan Mondal",
      "createdAt": "2026-06-05"
    }
  ]
}
```

---

## POST `/api/v1/materials/:materialID/comments`

Comment on a material.

### Request Body

```json
{
  "comment": "Great resource for CSE semester exams. The prefix sum technique explanations are clear and the examples are well-chosen. Definitely helped me prepare better."
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "comment": "Great resource for CSE semester exams. The prefix sum technique explanations are clear and the examples are well-chosen. Definitely helped me prepare better."
  }
}
```

---

## PATCH `/api/v1/comments/:commentID`

Edit a comment.

### Request Body

```json
{
  "comment": "Updated comment"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "comment": "Updated comment"
  }
}
```

---

## DELETE `/api/v1/comments/:commentID`

Delete a comment.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Users

> The JWT is set as an `httpOnly` cookie via `res.cookie()` on the backend. It is never included in any JSON response body — none of the endpoints below return a `token` field. Frontend requests use `credentials: 'include'`; there is no client-side token storage. Student accounts do not carry `college`/`branch`/`year` — those fields are dropped entirely. Teacher accounts add `institutionName`, `idProofUrl`, and `verificationStatus` (`"pending" | "verified" | "rejected"`, lowercase). `passwordConfirm` is not sent to the backend; password matching is handled client-side.

## POST `/api/v1/users/signup`

Create a new user account.

### Request Body

```json
{
  "name": "Sayan Mondal",
  "email": "sayan@example.com",
  "password": "password123",
  "role": "student"
}
```

> Teacher signup additionally includes `institutionName` and `idProofUrl` (the latter obtained via a prior direct-to-Cloudinary upload).

### Response

```json
{
  "status": "success",
  "user": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student"
  }
}
```

---

## POST `/api/v1/users/login`

Login user.

### Request Body

```json
{
  "email": "runa@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "status": "success",
  "user": {
    "_id": "1",
    "name": "Runa Mukherjee",
    "email": "runa@example.com",
    "role": "teacher",
    "institutionName": "Jadavpur University",
    "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
    "verificationStatus": "verified"
  }
}
```

---

## POST `/api/v1/users/logout`

Logout user. Clears the `httpOnly` auth cookie server-side (cannot be cleared by JS alone).

### Response

```json
{
  "status": "success"
}
```

---

## POST `/api/v1/users/forgotPassword`

Request password reset.

### Request Body

```json
{
  "email": "sayan@example.com"
}
```

### Response

```json
{
  "status": "success",
  "message": "Token sent to email!"
}
```

---

## POST `/api/v1/users/resetPassword/:token`

Reset password.

### Request Body

```json
{
  "password": "newPassword123",
  "passwordConfirm": "newPassword123"
}
```

### Response

```json
{
  "status": "success",
  "user": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student"
  }
}
```

---

## PATCH `/api/v1/users/updateMyPassword`

Update logged-in user's password.

### Request Body

```json
{
  "passwordCurrent": "oldPassword",
  "password": "newPassword123",
  "passwordConfirm": "newPassword123"
}
```

### Response

```json
{
  "status": "success",
  "user": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student"
  }
}
```

---

## GET `/api/v1/users/me`

Get logged-in user's profile.

### Response (student)

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "createdAt": "25-04-2024",
    "role": "student"
  }
}
```

### Response (teacher)

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Runa Mukherjee",
    "email": "runa@example.com",
    "createdAt": "15-07-2010",
    "role": "teacher",
    "institutionName": "Jadavpur University",
    "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
    "verificationStatus": "verified"
  }
}
```

---

## PATCH `/api/v1/users/me`

Update logged-in user's profile.

### Request Body

```json
{
  "name": "Sayan K. Mondal"
}
```

> Only fields present on the caller's role (see the response shapes above) are updatable — e.g. a student cannot set `institutionName`.

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Sayan K. Mondal",
    "email": "sayan@example.com",
    "createdAt": "25-04-2024",
    "role": "student"
  }
}
```

---

## DELETE `/api/v1/users/me`

Delete logged-in user's account.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

## GET `/api/v1/users`

Get all users.

### Response

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "_id": "1",
      "name": "Sayan Mondal",
      "email": "sayan@example.com",
      "role": "student"
    },
    {
      "_id": "2",
      "name": "Runa Mukherjee",
      "email": "runa@example.com",
      "role": "teacher",
      "institutionName": "Jadavpur University",
      "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
      "verificationStatus": "pending"
    }
  ]
}
```

---

## GET `/api/v1/users/:userID`

Get a single user.

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "createdAt": "25-04-2024",
    "role": "student"
  }
}
```

> Same student/teacher shape distinction as `GET /api/v1/users/me` above.

---

## GET `/api/v1/users/:userID/materials`

Get all materials uploaded by a user.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "title": "Complete Array Problems Guide",
      "description": "A concise guide covering essential array concepts, searching techniques, and problem-solving patterns commonly used in MAKAUT Data Structures exams.",
      "fileUrl": "https://example.com/file1.pdf",
      "uploadDate": "2026-06-05",
      "status": "approved",
      "userId": { "_id": "1", "name": "Sayan Mondal", "role": "student" },
      "topicId": "1",
      "isBestMaterial": false,
      "isTopperMaterial": false,
      "isAIPicked": false,
      "ratingsAverage": 4.8,
      "ratingsQuantity": 245
    }
  ]
}
```

> Same full material shape as every other materials endpoint (see the Materials section) — `userId` is redundant here since the route is already scoped to one user, but the shape stays uniform rather than trimmed.

---

## PATCH `/api/v1/users/:userID`

Update a user.

### Request Body

```json
{
  "verificationStatus": "verified"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "verificationStatus": "verified"
  }
}
```

---

## DELETE `/api/v1/users/:userID`

Delete a user.

### Response

```json
{
  "status": "success",
  "data": null
}
```

---

# Topper Badge Applications

## GET `/api/v1/topperBadgeApplications`

Get all topper badge applications.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "userId": "1",
      "userName": "Sayan Mondal",
      "subject": "Database Management Systems",
      "exam": "Maulana Abul Kalam Azad University of Technology",
      "branch": "Computer Science & Engineering",
      "year": 2025,
      "cgpa": 9,
      "markSheetUrl": "https://resources/marksheet/1/1",
      "status": "pending"
    }
  ]
}
```

---

## GET `/api/v1/users/:userID/topperBadgeApplications`

Get all topper badge applications of a user.

### Response

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "subject": "DBMS",
      "exam": "MAKAUT",
      "branch": "CSE",
      "year": 2025,
      "status": "pending"
    }
  ]
}
```

---

## POST `/api/v1/users/:userID/topperBadgeApplications`

Create a topper badge application.

### Request Body

```json
{
  "exam": "Jadavpur University",
  "branch": "IT",
  "subject": "DSA",
  "year": 2024,
  "cgpa": 9,
  "markSheetUrl": "https://resources/marksheet/3"
}
```

### Response

```json
{
  "status": "success",
  "message": "Application submitted successfully",
  "data": {
    "_id": "2",
    "subject": "DSA",
    "exam": "Jadavpur University",
    "branch": "IT",
    "year": 2024,
    "status": "pending"
  }
}
```

---

## PATCH `/api/v1/topperBadgeApplications/:applicationID`

Update topper badge application status.

### Request Body

```json
{
  "status": "approved"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "status": "approved"
  }
}
```

---

## DELETE `/api/v1/topperBadgeApplications/:applicationID`

Delete topper badge application.

### Response

```json
{
  "status": "success",
  "data": null
}
```
