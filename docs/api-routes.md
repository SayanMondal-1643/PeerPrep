# PeerPrep API Documentation

> **Conventions used throughout this document:**
>
> - **Populated `userId` / `reporterId` fields** (in materials, comments, and reports): every populated user reference includes `_id`, `name`, `role`. Users with `role: "teacher"` additionally include `verificationStatus`.
> - **Status enums:**
>   - Material `status`: `"pending" | "approved" | "rejected"`
>   - Report `status`: `"pending" | "resolved" | "rejected"`
>   - Topper Badge Application `status`: `"pending" | "approved" | "rejected"`
>   - User `verificationStatus` (teachers only): `"pending" | "verified" | "rejected"`
>   - User `accountStatus` (all users): `"active" | "suspended"`

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
    "name": "Jadavpur University"
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
  "exam": "Maulana Abul Kalam Azad University of Technology",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Computer Science & Engineering"
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
  "name": "Computer Science & Engineering Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Computer Science & Engineering Updated"
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
  "exam": "Maulana Abul Kalam Azad University of Technology",
  "branch": "Computer Science & Engineering",
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
  "branch": "Computer Science & Engineering",
  "subject": "Data Structures & Algorithms",
  "results": 1,
  "data": [
    {
      "_id": "1",
      "name": "Basic Terminologies & Algorithm Analysis"
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
  "name": "Searching techniques"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "name": "Searching techniques"
  }
}
```

---

## PATCH `/api/v1/topics/:topicID`

Update a topic.

### Request Body

```json
{
  "name": "Basic Terminologies & Algorithm Analysis Updated"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Basic Terminologies & Algorithm Analysis Updated"
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

## GET `/api/v1/materials`

Get all materials.

### Response

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "_id": "1",
      "title": "Searching Techniques Guide: Linear & Binary Search",
      "description": "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
      "fileUrl": "https://example.com/file1.pdf",
      "uploadDate": "2026-06-05",
      "status": "approved",
      "userId": {
        "_id": "1",
        "name": "Sayan Mondal",
        "role": "student"
      },
      "topicId": "2",
      "isBestMaterial": true,
      "isTopperMaterial": false,
      "isAIPicked": false,
      "ratingsAverage": 4.8,
      "ratingsQuantity": 77
    },
    {
      "_id": "2",
      "title": "Complete Guide to Stacks: ADT and Applications",
      "description": "Covers the Stack ADT and its core operations, along with expression conversion (infix to postfix/prefix) and expression evaluation with algorithms and complexity analysis.",
      "fileUrl": "https://example.com/file2.pdf",
      "uploadDate": "2026-06-08",
      "status": "approved",
      "userId": {
        "_id": "2",
        "name": "Runa Mukherjee",
        "role": "teacher",
        "verificationStatus": "verified"
      },
      "topicId": "3",
      "isBestMaterial": true,
      "isTopperMaterial": false,
      "isAIPicked": true,
      "ratingsAverage": 4,
      "ratingsQuantity": 2
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
  "exam": "Maulana Abul Kalam Azad University of Technology",
  "branch": "Computer Science & Engineering",
  "subject": "Data Structures & Algorithms",
  "topic": "Stacks",
  "results": 1,
  "data": [
    {
      "_id": "2",
      "title": "Complete Guide to Stacks: ADT and Applications",
      "description": "Covers the Stack ADT and its core operations, along with expression conversion (infix to postfix/prefix) and expression evaluation with algorithms and complexity analysis.",
      "fileUrl": "https://example.com/file2.pdf",
      "uploadDate": "2026-06-08",
      "status": "approved",
      "userId": {
        "_id": "2",
        "name": "Runa Mukherjee",
        "role": "teacher",
        "verificationStatus": "verified"
      },
      "topicId": "3",
      "isBestMaterial": true,
      "isTopperMaterial": false,
      "isAIPicked": true,
      "ratingsAverage": 4,
      "ratingsQuantity": 2
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
    "title": "Searching Techniques Guide: Linear & Binary Search",
    "description": "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
    "fileUrl": "https://example.com/file1.pdf",
    "uploadDate": "2026-06-05",
    "status": "approved",
    "userId": {
      "_id": "1",
      "name": "Sayan Mondal",
      "role": "student"
    },
    "topicId": "2",
    "isBestMaterial": true,
    "isTopperMaterial": false,
    "isAIPicked": false,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 77
  }
}
```

---

## POST `/api/v1/topics/:topicID/materials`

Create a material under a topic.

### Request Body

```json
{
  "title": "MAKAUT Previous Year Questions On Searching Techniques",
  "description": "A curated set of previous year MAKAUT exam questions on linear, binary, and interpolation search, with detailed step-by-step solutions.",
  "fileUrl": "https://example.com/file3.pdf"
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "3",
    "title": "MAKAUT Previous Year Questions On Searching Techniques",
    "description": "A curated set of previous year MAKAUT exam questions on linear, binary, and interpolation search, with detailed step-by-step solutions.",
    "fileUrl": "https://example.com/file3.pdf",
    "uploadDate": "2026-06-10",
    "status": "approved",
    "userId": { "_id": "3", "name": "Subhajit Kundu", "role": "student" },
    "topicId": "2",
    "isBestMaterial": false,
    "isTopperMaterial": true,
    "isAIPicked": false,
    "ratingsAverage": 4.5,
    "ratingsQuantity": 32
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
    "_id": "1",
    "title": "Searching Techniques Guide: Linear & Binary Search",
    "description": "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
    "fileUrl": "https://example.com/file1.pdf",
    "uploadDate": "2026-06-05",
    "status": "approved",
    "userId": {
      "_id": "1",
      "name": "Sayan Mondal",
      "role": "student"
    },
    "topicId": "2",
    "isBestMaterial": true,
    "isTopperMaterial": false,
    "isAIPicked": false,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 77
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

> Every endpoint below returns the **full report object** under `data` — same shape regardless of which endpoint served it: `_id`, `materialId`, `materialTitle`, `reporterId`, `reportReason`, `comment`, `reportDate`, `status`. POST/PATCH additionally include a `message` field alongside `data`.

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
      "materialId": "2",
      "materialTitle": "MAKAUT Previous Year Questions On Searching Techniques",
      "reporterId": {
        "_id": "1",
        "name": "Sayan Mondal",
        "role": "student"
      },
      "reportReason": "Incorrect content",
      "comment": "Not all questions are actual MAKAUT PYQs",
      "reportDate": "2026-06-13",
      "status": "pending"
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
  "comment": "Not all questions are actual MAKAUT PYQs"
}
```

### Response

```json
{
  "status": "success",
  "message": "Report submitted successfully",
  "data": {
    "_id": "2",
    "materialId": "1",
    "materialTitle": "Searching Techniques Guide: Linear & Binary Search",
    "reporterId": {
      "_id": "3",
      "name": "Subhajit Kundu",
      "role": "student"
    },
    "reportReason": "Incorrect content",
    "comment": "Not all questions are actual MAKAUT PYQs",
    "reportDate": "2026-07-14",
    "status": "pending"
  }
}
```

---

## PATCH `/api/v1/reports/:reportID`

Update report status.

### Request Body

```json
{
  "status": "resolved"
}
```

### Response

```json
{
  "status": "success",
  "message": "Status updated successfully",
  "data": {
    "_id": "1",
    "materialId": "2",
    "materialTitle": "MAKAUT Previous Year Questions On Searching Techniques",
    "reporterId": {
      "_id": "1",
      "name": "Sayan Mondal",
      "role": "student"
    },
    "reportReason": "Incorrect content",
    "comment": "Not all questions are actual MAKAUT PYQs",
    "reportDate": "2026-06-13",
    "status": "resolved"
  }
}
```

---

# Comments

> Every endpoint below returns the **full comment object** — same shape regardless of which endpoint served it: `_id`, `comment`, `userId`, `createdAt`.

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
      "comment": "The linear search section could use a bit more depth — a dry run and a note on its space complexity would round it out nicely. Everything else, especially the binary search analysis, is explained very well",
      "userId": {
        "_id": "2",
        "name": "Runa Mukherjee",
        "role": "teacher",
        "verificationStatus": "verified"
      },
      "createdAt": "2026-06-10"
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
  "comment": "Simple and to the point. Helped me revise searching techniques quickly before my semester exam."
}
```

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "2",
    "comment": "Simple and to the point. Helped me revise searching techniques quickly before my semester exam.",
    "userId": {
      "_id": "3",
      "name": "Subhajit Kundu",
      "role": "student"
    },
    "createdAt": "2026-07-14"
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
    "_id": "1",
    "comment": "Updated comment",
    "userId": {
      "_id": "2",
      "name": "Runa Mukherjee",
      "role": "teacher",
      "verificationStatus": "verified"
    },
    "createdAt": "2026-06-10"
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

> The JWT is set as an `httpOnly` cookie via `res.cookie()` on the backend. It is never included in any JSON response body — none of the endpoints below return a `token` field. Frontend requests use `credentials: 'include'`; there is no client-side token storage. Teacher accounts add `institutionName`, `idProofUrl`, and `verificationStatus` (`"pending" | "verified" | "rejected"`, lowercase). `passwordConfirm` is not sent to the backend; password matching is handled client-side.

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

> Teacher signup additionally includes `institutionName` and `idProofUrl`.

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student",
    "accountStatus": "active"
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
  "data": {
    "_id": "2",
    "name": "Runa Mukherjee",
    "email": "runa@example.com",
    "role": "teacher",
    "institutionName": "Netaji Subhash Engineering College",
    "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
    "verificationStatus": "verified",
    "accountStatus": "active"
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
  "data": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student",
    "accountStatus": "active"
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
  "data": {
    "_id": "1",
    "name": "Sayan Mondal",
    "email": "sayan@example.com",
    "role": "student",
    "accountStatus": "active"
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
    "role": "student",
    "accountStatus": "active"
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
    "role": "teacher",
    "institutionName": "Netaji Subhash Engineering College",
    "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
    "verificationStatus": "verified",
    "accountStatus": "active"
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

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "1",
    "name": "Sayan K. Mondal",
    "email": "sayan@example.com",
    "role": "student",
    "accountStatus": "active"
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
      "role": "student",
      "accountStatus": "active"
    },
    {
      "_id": "2",
      "name": "Runa Mukherjee",
      "email": "runa@example.com",
      "role": "teacher",
      "institutionName": "Netaji Subhash Engineering College",
      "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/5.pdf",
      "verificationStatus": "verified",
      "accountStatus": "active"
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
    "role": "student",
    "accountStatus": "active"
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
      "title": "Searching Techniques Guide: Linear & Binary Search",
      "description": "A thorough walkthrough of linear and binary search, covering both iterative and recursive approach of binary search along with their time complexity analysis.",
      "fileUrl": "https://example.com/file1.pdf",
      "uploadDate": "2026-06-05",
      "status": "approved",
      "userId": {
        "_id": "1",
        "name": "Sayan Mondal",
        "role": "student"
      },
      "topicId": "2",
      "isBestMaterial": true,
      "isTopperMaterial": false,
      "isAIPicked": false,
      "ratingsAverage": 4.8,
      "ratingsQuantity": 77
    }
  ]
}
```

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
    "name": "Runa Mukherjee",
    "email": "runa@example.com",
    "role": "teacher",
    "institutionName": "Netaji Subhash Engineering College",
    "idProofUrl": "https://res.cloudinary.com/peerprep/id-proof/1.pdf",
    "verificationStatus": "verified",
    "accountStatus": "active"
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

> Every endpoint below returns the **full topper badge object** — same shape regardless of which endpoint served it: `_id`, `userId`, `userName`, `subject`, `exam`, `branch`, `year`, `cgpa`, `markSheetUrl`, `status`.

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
      "subject": "Computer Networks",
      "exam": "Maulana Abul Kalam Azad University of Technology",
      "branch": "Computer Science & Engineering",
      "year": 2025,
      "cgpa": 9,
      "markSheetUrl": "https://res.cloudinary.com/peerprep/marksheet/1.pdf",
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
      "userId": "1",
      "userName": "Sayan Mondal",
      "subject": "Computer Networks",
      "exam": "Maulana Abul Kalam Azad University of Technology",
      "branch": "Computer Science & Engineering",
      "year": 2025,
      "cgpa": 9,
      "markSheetUrl": "https://res.cloudinary.com/peerprep/marksheet/1.pdf",
      "status": "approved"
    }
  ]
}
```

> `userId`/`userName` are redundant here since the route is already scoped to one user, but the shape stays uniform rather than trimmed.

---

## POST `/api/v1/users/:userID/topperBadgeApplications`

Create a topper badge application.

### Request Body

```json
{
  "exam": "Maulana Abul Kalam Azad University of Technology",
  "branch": "Computer Science & Engineering",
  "subject": "Object-Oriented Programming",
  "year": 2025,
  "cgpa": 7,
  "markSheetUrl": "https://res.cloudinary.com/peerprep/marksheet/2.pdf"
}
```

### Response

```json
{
  "status": "success",
  "message": "Application submitted successfully",
  "data": {
    "_id": "2",
    "userId": "4",
    "userName": "Akash Samanta",
    "subject": "Object-Oriented Programming",
    "exam": "Maulana Abul Kalam Azad University of Technology",
    "branch": "Computer Science & Engineering",
    "year": 2025,
    "cgpa": 7,
    "markSheetUrl": "https://res.cloudinary.com/peerprep/marksheet/1/3.pdf",
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
    "_id": "2",
    "userId": "4",
    "userName": "Akash Samanta",
    "subject": "Object-Oriented Programming",
    "exam": "Maulana Abul Kalam Azad University of Technology",
    "branch": "Computer Science & Engineering",
    "year": 2025,
    "cgpa": 7,
    "markSheetUrl": "https://res.cloudinary.com/peerprep/marksheet/1/3.pdf",
    "status": "approved"
  }
}
```
