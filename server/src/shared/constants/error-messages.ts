export const ERROR_MESSAGES = {
    // Authentication errors
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid username or password',
        USER_NOT_FOUND: 'User does not exist',
        WRONG_PASSWORD: 'Incorrect password',
        UNAUTHORIZED: 'You are not authorized to access this resource',
        TOKEN_EXPIRED: 'Your session has expired, please login again',
        TOKEN_INVALID: 'Invalid authentication token',
    },

    // User management errors
    USER: {
        ALREADY_EXISTS: 'Username already exists',
        NOT_FOUND: 'User not found',
        CREATION_FAILED: 'Failed to create user',
        UPDATE_FAILED: 'Failed to update user',
        DELETE_FAILED: 'Failed to delete user',
    },

    // Profile management errors
    PROFILE: {
        NOT_FOUND: 'Profile not found',
        ALREADY_EXISTS: 'Profile already exists for this user',
        CREATION_FAILED: 'Failed to create profile',
        UPDATE_FAILED: 'Failed to update profile',
        DELETE_FAILED: 'Failed to delete profile',
        ACCESS_DENIED: 'You do not have permission to access this profile',
    },

    // Password errors
    PASSWORD: {
        MISMATCH: 'Passwords do not match',
        TOO_WEAK: 'Password is too weak',
        OLD_PASSWORD_INCORRECT: 'Current password is incorrect',
        SAME_AS_OLD: 'New password must be different from current password',
    },

    // Validation errors
    VALIDATION: {
        REQUIRED_FIELD: 'This field is required',
        INVALID_EMAIL: 'Please enter a valid email address',
        INVALID_FORMAT: 'Invalid format',
        TOO_SHORT: 'Value is too short',
        TOO_LONG: 'Value is too long',
    },

    // General errors
    GENERAL: {
        BAD_REQUEST: 'Invalid request',
        FORBIDDEN: 'Access denied',
        NOT_FOUND: 'Resource not found',
        INTERNAL_ERROR: 'An unexpected error occurred',
        SERVICE_UNAVAILABLE: 'Service is temporarily unavailable',
    },

    // Business logic errors
    BUSINESS: {
        INSUFFICIENT_PERMISSION: 'You do not have permission to perform this action',
        RESOURCE_CONFLICT: 'Resource conflict detected',
        OPERATION_NOT_ALLOWED: 'This operation is not allowed',
    },
} as const;

// Error codes for programmatic handling
export const ERROR_CODES = {
    AUTH: {
        INVALID_CREDENTIALS: 'AUTH_001',
        USER_NOT_FOUND: 'AUTH_002',
        WRONG_PASSWORD: 'AUTH_003',
        UNAUTHORIZED: 'AUTH_004',
        TOKEN_EXPIRED: 'AUTH_005',
        TOKEN_INVALID: 'AUTH_006',
    },
    USER: {
        ALREADY_EXISTS: 'USER_001',
        NOT_FOUND: 'USER_002',
        CREATION_FAILED: 'USER_003',
        UPDATE_FAILED: 'USER_004',
        DELETE_FAILED: 'USER_005',
    },
    PROFILE: {
        NOT_FOUND: 'PROFILE_001',
        ALREADY_EXISTS: 'PROFILE_002',
        CREATION_FAILED: 'PROFILE_003',
        UPDATE_FAILED: 'PROFILE_004',
        DELETE_FAILED: 'PROFILE_005',
        ACCESS_DENIED: 'PROFILE_006',
    },
    PASSWORD: {
        MISMATCH: 'PWD_001',
        TOO_WEAK: 'PWD_002',
        OLD_PASSWORD_INCORRECT: 'PWD_003',
        SAME_AS_OLD: 'PWD_004',
    },
    VALIDATION: {
        REQUIRED_FIELD: 'VAL_001',
        INVALID_EMAIL: 'VAL_002',
        INVALID_FORMAT: 'VAL_003',
        TOO_SHORT: 'VAL_004',
        TOO_LONG: 'VAL_005',
    },
    GENERAL: {
        BAD_REQUEST: 'GEN_001',
        FORBIDDEN: 'GEN_002',
        NOT_FOUND: 'GEN_003',
        INTERNAL_ERROR: 'GEN_004',
        SERVICE_UNAVAILABLE: 'GEN_005',
    },
    BUSINESS: {
        INSUFFICIENT_PERMISSION: 'BIZ_001',
        RESOURCE_CONFLICT: 'BIZ_002',
        OPERATION_NOT_ALLOWED: 'BIZ_003',
    },
} as const;
