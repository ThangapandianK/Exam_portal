import Swal, { SweetAlertResult } from 'sweetalert2';

export function showSuccessMessage(message: string): Promise<SweetAlertResult> {
  return  Swal.fire('Success', message, 'success');
}
export function showErrorMessage(message: string): void {
    Swal.fire('Error', message, 'error');
}
export function showWarningMessage(message: string): void {
    Swal.fire('Warning', message, 'warning');
}



