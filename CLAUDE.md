# Fastrack - Claude Code Documentation

## Project Overview
Fastrack is a React-based online learning platform that allows tutors to create, manage, and sell courses to students.

## Recent Updates

### User Data Refresh Feature
**Date**: 2025-09-10
**Description**: Added functionality to refresh user details from the server to show latest tutor information including updated account balance.

#### Backend API Requirements
The following endpoint must be implemented on the backend:

```
GET /api/tutors/{tutorId}
Authorization: Bearer {access_token}

Response:
{
  "tutor": {
    "id": "tutor_id",
    "first_name": "string",
    "last_name": "string",
    "display_name": "string",
    "email": "string",
    "account_balance": number,
    "expertise": "string",
    // ... other tutor fields
  }
}
```

#### Frontend Implementation
- **Service**: `authService.refreshUserDetails()` in `src/services/auth.js`
- **Context**: `refreshUserDetails()` function in `AuthContext`
- **UI**: Refresh button in Dashboard header
- **Storage**: Updates localStorage with fresh user data

#### Files Modified
1. `src/services/auth.js` - Added `refreshUserDetails()` method
2. `src/contexts/AuthContext.jsx` - Added refresh functionality to context
3. `src/pages/Dashboard.jsx` - Added refresh button and handler

## Development Commands

```bash
# Development server
npm run dev

# Build project
npm run build

# Lint code
npm run lint
```

## API Base URL
- Development: `http://localhost:3000`

## Quiz Management (Updated)
**Date**: 2025-09-10
**Description**: Complete quiz management system with standalone quizzes (no course dependencies).

### Working Endpoints:
```
GET /api/quizzes/my-quizzes - Get tutor's quizzes
POST /api/quizzes - Create standalone quiz
POST /api/quizzes/{id}/questions - Add questions
PUT /api/quizzes/{id} - Update/publish quiz  
DELETE /api/quizzes/{id} - Delete quiz
GET /api/quizzes/{id}/submissions - View submissions
```

### Quiz Features:
- Standalone quiz creation (no course selection required)
- Dynamic question builder (2-6 options per question)
- Quiz preview functionality
- Submissions tracking with pass/fail status
- Publish/unpublish functionality
- Responsive design with error handling

## Key Features
- Role-based authentication (tutors/students)
- Course management with sections and videos
- **Quiz management system** with standalone quizzes
- Dashboard with statistics and balance tracking
- Real-time user data refresh