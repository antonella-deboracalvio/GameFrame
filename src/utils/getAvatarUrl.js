export function getAvatarUrl(file) {
    if (!file) {
      return 'https://khbjbuvumsyaunhlrchd.supabase.co/storage/v1/object/sign/avatars/0.1956607600469995.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMTk1NjYwNzYwMDQ2OTk5NS5wbmciLCJpYXQiOjE3MzcwNjMwNzQsImV4cCI6MTc2ODU5OTA3NH0.NE60fTVN3zZw5YEe4GHvNkJJInFBqZmqUqBJ-0iR2FA&t=2025-01-16T21%3A31%3A13.538Z'; // Immagine di default
    }

    return `https://khbjbuvumsyaunhlrchd.supabase.co/storage/v1/object/public/avatars/${file}`;
  }