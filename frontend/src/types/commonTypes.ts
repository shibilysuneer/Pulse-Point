
export interface ProtectedRouteProps{
     allowedRoles: string[];
} 
export interface PaginationPayload {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}
export interface PaginationSearchProps {
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
}
