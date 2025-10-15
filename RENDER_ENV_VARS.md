# 🔧 Render Environment Variables

Copy and paste these EXACTLY into Render's Environment Variables section:

## Required Variables (Copy these to Render):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/staywise?retryWrites=true&w=majority
JWT_SECRET=staywise-super-secret-jwt-key-2024-production-xyz789
FRONTEND_URL=http://localhost:3000
```

## How to Add in Render:

1. Go to your Render service
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable one by one:

### Variable 1:
- **Key:** `NODE_ENV`
- **Value:** `production`

### Variable 2:
- **Key:** `PORT`
- **Value:** `5000`

### Variable 3:
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/staywise?retryWrites=true&w=majority`
*(Replace with your actual MongoDB Atlas connection string)*

### Variable 4:
- **Key:** `JWT_SECRET`
- **Value:** `staywise-super-secret-jwt-key-2024-production-xyz789`

### Variable 5:
- **Key:** `FRONTEND_URL`
- **Value:** `http://localhost:3000`
*(Update this later to your Vercel URL after frontend deployment)*

## Important Notes:

1. **MONGODB_URI**: Replace with your actual MongoDB Atlas connection string
2. **JWT_SECRET**: You can change this to any random string
3. **FRONTEND_URL**: Update this after deploying to Vercel

## After Adding Variables:
Click "Save Changes" and Render will automatically redeploy your service.
