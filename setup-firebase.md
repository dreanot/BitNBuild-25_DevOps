# 🚀 Firebase Setup Guide for TaxWise

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `taxwise-app`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

## Step 3: Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

## Step 4: Enable Storage
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Click "Done"

## Step 5: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (`</>`)
4. Register app name: `taxwise-web`
5. Copy the config object

## Step 6: Update Config
Replace the config in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "taxwise-app.firebaseapp.com",
  projectId: "taxwise-app",
  storageBucket: "taxwise-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## Step 7: Install Firebase CLI (Optional)
```bash
npm install -g firebase-tools
firebase login
firebase init
```

## Step 8: Deploy Rules
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## Step 9: Test Your Setup
1. Run your app: `npm run dev`
2. Try to sign up with a test email
3. Check Firebase Console to see if data appears

## 🔧 Security Rules Already Set Up:
- Users can only access their own data
- Authentication required for all operations
- Public data is read-only

## 📱 Features Ready:
- ✅ User Authentication
- ✅ Data Storage (Firestore)
- ✅ File Upload (Storage)
- ✅ Real-time Updates
- ✅ Security Rules
- ✅ Offline Support

## 🚀 Deploy to Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```

Your app will be live at: `https://taxwise-app.web.app`
