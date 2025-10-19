// Generic API Response Types
export interface ApiError {
    statusCode: number;
    message: string;
    error: string;
}

export interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
    statusCode?: number;
}

// Generic pagination types (for future use)
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
