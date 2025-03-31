/**
 * Standard Panel Component
 * 
 * A simple panel component that displays the standard member status.
 * Features:
 * - Responsive design
 * - Dark mode support
 * - Visual status indicator
 */

/**
 * Standard Panel Component
 * 
 * Renders a panel indicating standard membership status with appropriate styling.
 * 
 * @returns {JSX.Element} A styled panel showing standard membership status
 */
export default function StandardPanel() {
  return (
    <div className="p-6 bg-accent/50 dark:bg-accent/20 rounded-sm">
      <p className="text-sm text-foreground">Standard Member</p>
    </div>
  );
} 