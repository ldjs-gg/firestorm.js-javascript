/**
 * Tooltip Component
 * 
 * A reusable tooltip component that displays text on hover.
 * Features include:
 * - Multiple positioning options (top, right, bottom)
 * - Smooth fade in/out animation
 * - Customizable content
 * - Responsive arrow indicator
 */

/**
 * Tooltip Component
 * 
 * Renders a tooltip that appears on hover with customizable position and content.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The element that triggers the tooltip
 * @param {string} props.text - The text to display in the tooltip
 * @param {'top'|'right'|'bottom'} [props.position='top'] - The position of the tooltip relative to its trigger
 * @returns {JSX.Element} A tooltip component
 */
export default function Tooltip({ children, text, position = 'top' }) {
  const tooltipClasses = position === 'top' 
    ? 'left-1/2 -translate-x-1/2 bottom-full mb-2'
    : position === 'right'
    ? 'left-full top-1/2 -translate-y-1/2 ml-2'
    : 'left-1/2 -translate-x-1/2 top-full mt-2';

  const arrowClasses = position === 'top'
    ? 'left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-t-[4px] border-t-popover border-r-[4px] border-r-transparent dark:border-t-popover'
    : position === 'right'
    ? 'left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-popover border-b-[4px] border-b-transparent dark:border-r-popover'
    : 'left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-l-[4px] border-l-transparent border-b-[4px] border-b-popover border-r-[4px] border-r-transparent dark:border-b-popover';

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${tooltipClasses} px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-sm border border-border`}>
        {text}
        <div className={`absolute ${arrowClasses}`}></div>
      </div>
    </div>
  );
} 