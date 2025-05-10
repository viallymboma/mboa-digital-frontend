// Type for Sort properties
export type SortType = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

// Type for Pageable
export type PageableType = {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: SortType;
    offset: number;
}

// Type for a Country item
export type CountryType = {
    statusCode: number;
    error: string;
    message: string;
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    version: number;
    code: string;
    nom: string;
    continent: string;
    imageUrl: string;
    archived: boolean;
}

// Main Paginated Response Interface
export type PaginatedCountryResponseType = {
    totalPages: number;
    totalElements: number;
    pageable: PageableType;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    sort: SortType;
    number: number; // current page number
    size: number;   // page size
    content: CountryType [];
    empty: boolean;
}