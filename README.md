# NoticeBoard - Full-Stack RBAC Application

## [View the deployed app here](https://noticeboard0.netlify.app/login)

## admin account
email - priyanshagarwal3381@gmail.com
password - 12345678

---

## moderator account
email - prarthan@gmail.com
password - 122345

---

## Overview

NoticeBoard is a full-stack application that implements Role-Based Access Control (RBAC). The app allows users, admins, and moderators to interact with notices published by the admin. Each role has specific permissions, providing a clear distinction between different user access levels.

---

## Features

- **User**: Can access all the notices that the admin publishes.
- **Admin**: 
  - Can publish new notices.
  - Can edit the list of admins and moderators.
  - Can view the list of users and notices.
- **Moderator**:
  - Can view notices and users published by the admin but cannot publish new notices.

---

## security
- JWT for authentication
- Password hashing

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Aiven.io cloud database service)
- **ORM**: Prisma
- **Backend Deployment** : render
- **Frontend Deployment** : netlify

---


