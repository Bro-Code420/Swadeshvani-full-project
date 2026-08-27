/**
 * Authentication utility for Swadesh Vani.
 * Handles unified credential verification, session management, and access guards.
 */

const ADMIN_STORAGE_KEY = "savdeshvani_admin_auth";
const USER_STORAGE_KEY = "savdeshvani_user_auth";

// Default admin credentials
const DEFAULT_CREDENTIALS = {
  email: "swadeshvaaniofficial@gmail.com",
  username: "admin",
  password: "Swadesh@vani10",
  role: "Chief Editor & Super Admin",
  name: "Swadesh Vani Admin",
};

/**
 * Check if the admin is currently authenticated in the current session.
 * @returns {boolean}
 */
export const isAdminAuthenticated = () => {
  try {
    const session =
      sessionStorage.getItem(ADMIN_STORAGE_KEY) ||
      localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!session) return false;

    const data = JSON.parse(session);
    if (data && data.authenticated && data.token) {
      if (data.expiresAt && Date.now() > data.expiresAt) {
        logoutAdmin();
        return false;
      }
      return true;
    }
  } catch (err) {
    console.error("Auth verification error:", err);
  }
  return false;
};

/**
 * Retrieve current admin user details if logged in.
 * @returns {object|null}
 */
export const getAdminUser = () => {
  try {
    const session =
      sessionStorage.getItem(ADMIN_STORAGE_KEY) ||
      localStorage.getItem(ADMIN_STORAGE_KEY);
    if (session) {
      const data = JSON.parse(session);
      return data.user || null;
    }
  } catch (err) {
    console.error("Error reading admin user data:", err);
  }
  return null;
};

/**
 * Unified authentication function:
 * Checks if credentials match Admin -> logs in as Admin and returns { role: 'admin' }
 * Otherwise, logs in as standard User/Reader -> returns { role: 'user' }
 */
export const authenticateAccount = (identifier, password, rememberMe = false) => {
  if (!identifier || !password) {
    return {
      success: false,
      message: "कृपया ईमेल/यूज़रनेम और पासवर्ड दोनों दर्ज करें।",
    };
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();

  // Check Admin Credentials
  const isAdminMatch =
    (cleanId === DEFAULT_CREDENTIALS.email.toLowerCase() ||
      cleanId === DEFAULT_CREDENTIALS.username.toLowerCase()) &&
    cleanPass === DEFAULT_CREDENTIALS.password;

  if (isAdminMatch) {
    const adminSession = {
      authenticated: true,
      token: `sv-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      loginTime: new Date().toISOString(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      user: {
        email: DEFAULT_CREDENTIALS.email,
        username: DEFAULT_CREDENTIALS.username,
        name: DEFAULT_CREDENTIALS.name,
        role: "admin",
      },
    };

    const payload = JSON.stringify(adminSession);
    sessionStorage.setItem(ADMIN_STORAGE_KEY, payload);
    if (rememberMe) {
      localStorage.setItem(ADMIN_STORAGE_KEY, payload);
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }

    window.dispatchEvent(new Event("sv_auth_change"));

    return {
      success: true,
      role: "admin",
      redirectTo: "/Admin",
      message: "एडमिन विशेषाधिकार प्राप्त हुए! एडमिन डैशबोर्ड पर भेजा जा रहा है...",
      user: adminSession.user,
    };
  }

  // Regular user reader authentication (accepts password length >= 4)
  if (cleanPass.length < 4) {
    return {
      success: false,
      message: "अमान्य क्रेडेंशियल्स या पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।",
    };
  }

  const displayName = cleanId.includes("@") ? cleanId.split("@")[0] : cleanId;
  const userSession = {
    authenticated: true,
    token: `sv-user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    loginTime: new Date().toISOString(),
    user: {
      email: cleanId.includes("@") ? cleanId : `${cleanId}@reader.swadeshvaani.in`,
      username: cleanId,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      role: "user",
    },
  };

  const userPayload = JSON.stringify(userSession);
  sessionStorage.setItem(USER_STORAGE_KEY, userPayload);
  if (rememberMe) {
    localStorage.setItem(USER_STORAGE_KEY, userPayload);
  }

  window.dispatchEvent(new Event("sv_auth_change"));

  return {
    success: true,
    role: "user",
    redirectTo: "/",
    message: `स्वागत है ${userSession.user.name}! आप सफलतापूर्वक लॉगिन हो गए हैं।`,
    user: userSession.user,
  };
};

/**
 * Check if regular user is logged in
 */
export const isUserAuthenticated = () => {
  try {
    const session =
      sessionStorage.getItem(USER_STORAGE_KEY) ||
      localStorage.getItem(USER_STORAGE_KEY);
    if (!session) return false;
    const data = JSON.parse(session);
    return !!(data && data.authenticated);
  } catch (e) {
    return false;
  }
};

/**
 * Get current session user (admin or reader)
 */
export const getCurrentAccount = () => {
  if (isAdminAuthenticated()) {
    return { ...getAdminUser(), role: "admin" };
  }
  try {
    const session =
      sessionStorage.getItem(USER_STORAGE_KEY) ||
      localStorage.getItem(USER_STORAGE_KEY);
    if (session) {
      const data = JSON.parse(session);
      return data.user || null;
    }
  } catch (e) {}
  return null;
};

/**
 * Logout the admin user
 */
export const logoutAdmin = () => {
  sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  window.dispatchEvent(new Event("sv_auth_change"));
};

/**
 * Logout any session (Admin or User)
 */
export const logoutAll = () => {
  logoutAdmin();
  sessionStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("sv_auth_change"));
};
