import { AxiosError } from "axios";
import { toast } from "sonner";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return "Network error — check that the backend is running.";
    }
    const status = error.response.status;
    const serverMessage = error.response.data?.message as string | undefined;

    if (status === 400) return serverMessage || "Invalid request.";
    if (status === 404) return serverMessage || "Resource not found.";
    if (status === 500) return serverMessage || "Server error. Please try again.";
    return serverMessage || `Request failed (${status}).`;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

export function handleApiError(error: unknown) {
  toast.error(getErrorMessage(error));
}