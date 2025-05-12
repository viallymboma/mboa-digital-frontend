// Types for Sort properties
export type SortType = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

// Types for Pageable
export type PageableType = {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: SortType;
    offset: number;
}

// Types for a Country item
export type CountryType = {
    statusCode?: number;
    error?: string;
    message?: string;
    id?: string;
    createdAt?: string; // ISO 8601 date string
    updatedAt?: string; // ISO 8601 date string
    version?: number;
    code: string;      // Country code (e.g., "US", "FR")
    nom: string;       // Country name
    continent?: string; // Continent name
    imageUrl: string;  // URL to country flag/image
    archived?: boolean;
}

// Main Paginated Response Type
export type PaginatedCountryResponseType = {
    totalElements: number;   // Total items across all pages
    totalPages: number;      // Total number of pages
    pageable: PageableType;     // Pagination information
    numberOfElements: number; // Number of items in current page
    first: boolean;         // Is first page
    last: boolean;          // Is last page
    sort: Sort;             // Sorting information
    number: number;         // Current page number (0-based)
    size: number;           // Page size (number of items per page)
    content: CountryType [];     // Array of country items
    empty: boolean;         // Is the content empty
}