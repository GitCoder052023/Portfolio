/**
 * Formatting Utilities
 */

/**
 * Format bytes to human readable file size
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}
