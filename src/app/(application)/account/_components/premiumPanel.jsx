/**
 * Premium Panel Component
 * 
 * A simple panel component that displays the premium member status.
 * Features:
 * - Responsive design
 * - Dark mode support
 * - Visual status indicator
 */

/**
 * Premium Panel Component
 * 
 * Renders a panel indicating premium membership status with appropriate styling.
 * 
 * @returns {JSX.Element} A styled panel showing premium membership status
 */
export default function PremiumPanel() {
  return (
    <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-sm">
      <p className="text-sm text-green-800 dark:text-green-100">Premium Member</p>
    </div>
  );
} 