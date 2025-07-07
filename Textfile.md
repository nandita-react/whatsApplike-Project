
==============================
 AUTHENTICATION ROUTES (OTP Based)
==============================
POST   /auth/send-otp            # Send OTP to user's phone or email
POST   /auth/verify-otp          # Verify the OTP and login/register
POST   /auth/logout              # User logout
POST   /auth/refresh-token       # Refresh access token

==============================
👤 USER ROUTES
==============================
GET    /users/me                # Get current user profile
PUT    /users/me                # Update profile info (name, photo, status)
GET    /users/search?q=        # Search users by name/phone
GET    /users/:id              # Get another user's public profile
PUT    /users/:id/block        # Block a user
PUT    /users/:id/unblock      # Unblock a user
GET    /users/blocked          # List of blocked users

==============================
💬 CHAT ROUTES
==============================
GET    /chats                  # Get list of user’s chats
POST   /chats                  # Create a new chat (1-1 or group)
GET    /chats/:id              # Get chat details
PUT    /chats/:id              # Rename group, update settings
DELETE /chats/:id              # Leave chat (if group) or delete chat (if 1-1)
POST   /chats/:id/participants           # Add users to group chat
DELETE /chats/:id/participants/:userId  # Remove user from group

==============================
📨 MESSAGE ROUTES
==============================
GET    /chats/:chatId/messages        # Get messages in a chat (with pagination)
POST   /chats/:chatId/messages        # Send message to chat
PUT    /messages/:messageId           # Edit a message (optional)
DELETE /messages/:messageId           # Delete a message (for self or everyone)
POST   /messages/:messageId/react     # React to a message (like emoji)
POST   /messages/:messageId/forward   # Forward message to other chat(s)
POST   /messages/:messageId/reply     # Reply to a message

==============================
📁 MEDIA UPLOADS
==============================
POST   /media/upload                  # Upload media (images, videos, files)
GET    /media/:mediaId                # Get media file

==============================
🔔 NOTIFICATIONS
==============================
GET    /notifications                # Get notification list
PUT    /notifications/:id/read       # Mark as read
POST   /notifications/token          # Register device push token (e.g. FCM)
DELETE /notifications/token          # Unregister device

==============================
✅ DELIVERY & READ RECEIPTS
==============================
POST   /messages/:id/delivered       # Mark as delivered
POST   /messages/:id/read            # Mark as read
GET    /messages/:id/status          # Get delivery/read status

==============================
⚙️ SETTINGS
==============================
GET    /settings                     # Get current user settings
PUT    /settings                     # Update settings (privacy, notifications, etc.)

==============================
💡 TYPING & PRESENCE
==============================
POST   /chats/:id/typing             # User is typing...
POST   /chats/:id/stop-typing        # User stopped typing
POST   /users/:id/presence           # Online/offline status (optional)
