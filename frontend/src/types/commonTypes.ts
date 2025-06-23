
export interface ProtectedRouteProps{
     allowedRoles: string[];
} 
export interface PaginationPayload {
  page: number;
  limit: number;
  search?: string;
}